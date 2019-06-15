import { GraphQLResolveInfo } from 'graphql';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { compose } from '../../../composables/composable.resolver';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { CategoryAttributes, CategoryStatusEnum } from '../../../models/CategoryModel';
import { CollaboratorAccessTypeEnum } from '../../../models/CollaboratorAccessModel';

interface CreateCategoryInput {
  restaurant: string
  name: string
  icon?: string
}

export const categoryResolver = {
  Query: {
    categories: compose<any, ResolverContext>(authResolver, verifyTokenResolver)((parent, args, { entityAuthenticated, db }: ResolverContext, info: GraphQLResolveInfo) => {
      return db!.Category.findAll({
        where: {
          restaurantId: entityAuthenticated!.restaurant
        }
      });
    })
  },
  Mutation: {
    createCategory: compose<any, ResolverContext>(authResolver, verifyTokenResolver)((parent, { input }, { db, entityAuthenticated }: ResolverContext, info: GraphQLResolveInfo) => {
      const { name, icon } = <CreateCategoryInput>input;
      const { restaurant: restaurantId, loginType } = entityAuthenticated!;

      if (loginType !== CollaboratorAccessTypeEnum.ADMIN)
        throw new Error('Just ADM can create a new category');

      return db!.Category.create({
        name,
        icon,
        restaurantId,
        status: CategoryStatusEnum.ACTIVE
      });
    })
  },
  Category: {
    restaurant: (category: CategoryAttributes, args, { dataLoaders: { restaurantLoader } }: { db: DbConnection, dataLoaders: DataLoaders }) => {
      return restaurantLoader.load(category.restaurantId!);
    }
  }
};
