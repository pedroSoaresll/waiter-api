import { GraphQLResolveInfo } from 'graphql';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { compose } from '../../../composables/composable.resolver';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';

interface CreateCategoryInput {
  restaurant: string
  name: string
  icon?: string
}

export const categoryResolver = {
  Query: {
    categories: compose<any, ResolverContext>(authResolver, verifyTokenResolver)((parent, args, { entityAuthenticated, db }: ResolverContext, info: GraphQLResolveInfo) => {
      console.log('entityAuthenticated', entityAuthenticated);
      return db!.Category.findAll({
        where: {
          restaurant: entityAuthenticated!.restaurant
        }
      });
    })
  },
  Mutation: {
    createCategory: (parent, args: CreateCategoryInput, { db, tokenInfo }: ResolverContext, info: GraphQLResolveInfo) => {
      console.log(tokenInfo);
      throw new Error('not implemented yet');
    }
  }
};