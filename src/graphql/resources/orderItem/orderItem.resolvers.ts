import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { mustBeClient } from '../../../composables/must-be-client.resolver';
import { ClientTokenInfo } from '../token/token.resolvers';
import { OrderItemInstance, OrderItemStatusEnum } from '../../../models/OrderItemModel';
import { ClientEntityAuthenticated } from '../../../interfaces/EntityAuthenticatedInterface';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { OrderInstance } from '../../../models/OrderModel';
import { GraphQLResolveInfo } from 'graphql';
import { ItemInstance } from '../../../models/ItemModel';

interface CreateOrderItem {
  itemId: string
}

export const orderItemResolver = {
  OrderItem: {
    order: (OrderItem: OrderItemInstance, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Order.findById<OrderInstance>(OrderItem.orderId);
    },
    item: (OrderItem: OrderItemInstance, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Item.findById<ItemInstance>(OrderItem.itemId);
    }
  },
  Mutation: {
    createOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeClient)(
      async (parent, { input }, { db, entityAuthenticated }: ResolverContext) => {
        const { itemId } = <CreateOrderItem>input;
        const { order: orderId } = <ClientEntityAuthenticated>entityAuthenticated;
        console.log(itemId);
        console.log(orderId);

        // check order
        const order = await db!.Order.findById(orderId);
        if (!order)
          throw new Error('Order not found');

        // todo: check if item belongs to restaurant

        // create a new item only if order is different of finish
        return await db!.OrderItem.create({
          orderId,
          itemId,
          status: OrderItemStatusEnum.PENDING
        });
      }
    )
  }
};
