import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { TableStatusEnum } from '../../../models/TableModel';
import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { mustBeCollaborator } from '../../../composables/must-be-collaborator.resolver';
import { CollaboratorEntityAuthenticated } from '../../../interfaces/EntityAuthenticatedInterface';

interface CreateTableInput {
  restaurant: string;
  name: string;
  status?: TableStatusEnum;
}

export const tableResolvers = {
  Query: {
    tables: compose<any, ResolverContext>(authResolver, verifyTokenResolver)(
      (parent, args, { db, entityAuthenticated }: ResolverContext) => {
        const { restaurant: restaurantId } = entityAuthenticated!;
        return db!.Table.findAll({
          where: {
            restaurantId,
          },
        });
      },
    ),
  },
  Mutation: {
    createTable: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeCollaborator)(
      async (parent, { input }, { db, entityAuthenticated }: ResolverContext) => {
        const { restaurant: collaboratorRestaurant } = <CollaboratorEntityAuthenticated>entityAuthenticated;
        const { name, restaurant, status } = <CreateTableInput>input;

        if (!name) throw new Error('Name is required');
        if (!restaurant) throw new Error('Restaurant ID is required');
        if (collaboratorRestaurant !== restaurant) throw new Error('You can not create a table to this restaurant');

        return await db!.Table.prototype.createWithQRCode({
          name,
          restaurantId: restaurant,
          status: status || TableStatusEnum.ACTIVE,
        });
      },
    ),
  },
  Table: {
    restaurant: (table, args, { db }: { db: DbConnection }) => db.Restaurant.find({
      where: {
        id: table.restaurantId,
      },
    }),
  },
};
