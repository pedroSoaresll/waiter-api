import { PubSub } from 'graphql-subscriptions';
import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { mustBeClient } from '../../../composables/must-be-client.resolver';
import { OrderItemInstance, OrderItemStatusEnum } from '../../../models/OrderItemModel';
import { ClientEntityAuthenticated } from '../../../interfaces/EntityAuthenticatedInterface';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { OrderInstance } from '../../../models/OrderModel';
import { GraphQLResolveInfo } from 'graphql';
import { ItemInstance } from '../../../models/ItemModel';

interface CreateOrderItem {
  itemId: string
}

interface RemoveOrderItem {
  orderItemId: string
}

const ORDER_ITEM_STATUS_UPDATED = 'ORDER_ITEM_STATUS_UPDATED';
const pubsub = new PubSub();

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
    ),
    removeOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeClient)(
      async (parent, { input }, { db, entityAuthenticated }: ResolverContext) => {
        const { orderItemId } = <RemoveOrderItem>input;
        const { order: orderId } = <ClientEntityAuthenticated>entityAuthenticated;

        // check order
        const order = await db!.Order.findById<OrderInstance>(orderId);
        if (!order)
          throw new Error('Order not found');

        // get orderItem
        const orderItem = await db!.OrderItem.findById<OrderItemInstance>(orderItemId);
        if (!orderItem)
          throw new Error('OrderItem not found');

        // if orderItem is canceled return error
        if (orderItem.status === OrderItemStatusEnum.CANCELED)
          throw new Error('OrderItem is already canceled');

        // if orderItem is with done and doing status return error
        if (orderItem.status !== OrderItemStatusEnum.PENDING)
          throw new Error('This OrderItem can not be canceled');

        // change status orderItem to canceled
        return orderItem.updateAttributes({
          status: OrderItemStatusEnum.CANCELED
        });
      }
    )
  },
  Subscription: {
    orderItemStatusUpdated: {
      subscribe: () => pubsub.asyncIterator(ORDER_ITEM_STATUS_UPDATED)
    }
  }
};
