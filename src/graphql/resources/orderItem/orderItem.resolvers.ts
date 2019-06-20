import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { mustBeClient } from '../../../composables/must-be-client.resolver';

export const orderItemResolver = {
  Mutation: {
    createOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeClient)(
      (parent, args, context: ResolverContext, info) => {
        throw new Error('not implemented yet')
      }
    )
  }
};
