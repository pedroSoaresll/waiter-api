import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';

const orderItemResolver = {
  Mutation: {
    createOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver)(
      () => {
      }
    )
  }
};
