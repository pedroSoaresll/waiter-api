import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { mustBeClient } from '../../../composables/must-be-client.resolver';
import { ClientTokenInfo } from '../token/token.resolvers';
import { OrderItemStatusEnum } from '../../../models/OrderItemModel';

interface CreateOrderItem {
  itemId: string
}

export const orderItemResolver = {
  Mutation: {
    createOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeClient)(
      async (parent, { input }, { db, entityAuthenticated }: ResolverContext) => {
        const { itemId } = <CreateOrderItem>input;
        const { orderId } = <ClientTokenInfo>entityAuthenticated;
        // check order
        const order = await db!.Order.findById(orderId);
        if (!order)
          throw new Error('Order not found');

        // create a new item only if order is different of finish
        const a = await db!.OrderItem.create({
          orderId,
          itemId,
          status: OrderItemStatusEnum.PENDING
        });

        console.log(a);
        return a;
      }
    )
  }
};
