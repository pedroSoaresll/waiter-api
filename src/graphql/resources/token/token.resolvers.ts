import { sign } from 'jsonwebtoken';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { compareStringBcrypt, JWT_SECRET } from '../../../utils/utils';
import Logger from '../../../utils/logger';
import { CollaboratorStatusEnum } from '../../../models/CollaboratorModel';
import { RestaurantAttributes, RestaurantStatusEnum } from '../../../models/RestaurantModel';
import { TableStatusEnum } from '../../../models/TableModel';
import { OrderStatusEnum } from '../../../models/OrderModel';
import { ClientInstance } from '../../../models/ClientModel';

const logger = Logger('GRAPHQL:TOKEN:RESOLVER');

export interface CreateTokenToCollaboratorInput {
  restaurantName: string;
  email: string;
  password: string;
  type?: string;
}

export interface CreateTokenToClientInput {
  restaurantId: string;
  tableId: string;
  clientName: string;
}

export interface TokenInfo {
  sub: string;
  restaurantId: string;
  loginType: string;
}

export interface ClientTokenInfo extends TokenInfo {
  tableId: string;
  orderId: string;
}

export const tokenResolvers = {
  Mutation: {
    createTokenToCollaborator: async (parent, { input }: { input: CreateTokenToCollaboratorInput }, { db }: { db: DbConnection }) => db.Collaborator.findOne({
      where: {
        email: input.email,
        status: CollaboratorStatusEnum.ACTIVE,
      },
      attributes: ['id', 'password'],
      include: [
        {
          model: db.CollaboratorAccess,
          as: 'collaboratorsAccess',
          attributes: ['id', 'accessType'],
          include: [
            {
              model: db.Restaurant,
              as: 'restaurant',
              where: {
                name: input.restaurantName,
                status: RestaurantStatusEnum.ACTIVE,
              },
              attributes: ['id'],
            },
          ],
        },
      ],
    })
      .then((collaborator) => {
        const errorMessage = 'Collaborator not found, restaurant name, email or password is wrong. Or your account is inactive.';
        if (!collaborator) throw new Error(errorMessage);

        const isPassword: boolean = compareStringBcrypt(input.password, collaborator.password!);
        if (!isPassword) throw new Error(errorMessage);

        if (!collaborator.collaboratorsAccess!.length) throw new Error('Your user do not have access in some establishment or establishment is not active');

        const payload = <TokenInfo>{
          sub: collaborator.id,
          restaurantId: collaborator.collaboratorsAccess![0].restaurant!.id,
          loginType: collaborator.collaboratorsAccess![0].accessType,
        };

        return {
          token: sign(payload, JWT_SECRET!),
        };
      })
      .catch((error) => {
        logger.error('error to generate a token: ', { error });
        throw error;
      }),
    createTokenToClient: async (parent, { input }: { input: CreateTokenToClientInput }, { db }: { db: DbConnection }) => {
      const restaurantAndTable = await db.Restaurant.find<RestaurantAttributes>({
        where: {
          id: input.restaurantId,
          status: RestaurantStatusEnum.ACTIVE,
        },
        include: [
          {
            model: db.Table,
            where: {
              id: input.tableId,
              restaurant: input.restaurantId,
              status: TableStatusEnum.ACTIVE,
            },
            as: 'tables',
          },
        ],
      }).catch((err) => {
        logger.error('error to find restaurant and table', { err });
        throw err;
      });

      if (!restaurantAndTable) throw new Error('Restaurant or table not found');

      const client = await db.Client.create({
        name: input.clientName,
      }).catch((err) => {
        logger.error('error to find client', { err });
        throw err;
      });

      if (!client) throw new Error('Error to create user');

      const order = await db.Order.create({
        status: OrderStatusEnum.PENDING,
        clientId: client.id,
        restaurantId: restaurantAndTable.id,
        tableId: restaurantAndTable.tables![0].id,
      }).catch((err) => {
        logger.error('error to create a order to client', { err });
        throw err;
      });

      if (!order) throw new Error('Error to create a new order to the client');

      const payload = <ClientTokenInfo>{
        sub: client.id,
        restaurantId: restaurantAndTable!.id,
        tableId: restaurantAndTable!.tables![0].id,
        orderId: order.id,
        loginType: 'CLIENT',
      };

      return {
        token: sign(payload, JWT_SECRET!),
      };
    },
  },
};
