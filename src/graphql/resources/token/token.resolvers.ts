import { sign } from 'jsonwebtoken';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { compareStringBcrypt, JWT_SECRET } from '../../../utils/utils';
import Logger from '../../../utils/logger';
import { AuthTypes } from '../../../commons/enums/auth-types';
import CollaboratorModel, { CollaboratorStatusEnum } from '../../../models/CollaboratorModel';
import { RestaurantStatusEnum } from '../../../models/RestaurantModel';

const logger = Logger('GRAPHQL:TOKEN:RESOLVER');

export interface CreateTokenInput {
  restaurantName: string
  email: string
  password: string
  type?: string
}

export interface TokenInfo {
  sub: string
  restaurantId: string
  loginType: string
}

export const tokenResolvers = {
  Mutation: {
    createToken: async (parent, { input }: { input: CreateTokenInput }, { db }: { db: DbConnection }) => {
      return db.Collaborator.findOne({
        where: {
          email: input.email,
          status: CollaboratorStatusEnum.ACTIVE
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
                  status: RestaurantStatusEnum.ACTIVE
                },
                attributes: ['id']
              }
            ]
          },
        ],
      })
        .then(collaborator => {
          let errorMessage: string = 'Collaborator not found, restaurant name, email or password is wrong. Or your account is inactive.';
          if (!collaborator)
            throw new Error(errorMessage);

          const isPassword: boolean = compareStringBcrypt(input.password, collaborator.password!);
          if (!isPassword)
            throw new Error(errorMessage);

          if (!collaborator.collaboratorsAccess!.length)
            throw new Error('Your user do not have access in some establishment or establishment is not active');

          const payload = <TokenInfo>{
            sub: collaborator.id,
            restaurantId: collaborator.collaboratorsAccess![0].restaurant!.id,
            loginType: collaborator.collaboratorsAccess![0].accessType
          };

          return {
            token: sign(payload, JWT_SECRET!)
          };
        })
        .catch(error => {
          logger.error('error to generate a token: ', { error });
          throw error;
        });
    }
  }
};