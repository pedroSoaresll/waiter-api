import { PubSub, withFilter } from 'graphql-subscriptions';
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
import { mustBeCollaborator } from '../../../composables/must-be-collaborator.resolver';

interface CreateOrderItem {
  itemId: string
}

interface RemoveOrderItem {
  orderItemId: string
}

interface DoingOrderItem {
  orderItemId: string
}

interface DoneOrderItem {
  orderItemId: string
}

interface DeliveredOrderItem {
  orderItemId: string
}

const ORDER_ITEM_STATUS_UPDATED = 'ORDER_ITEM_STATUS_UPDATED';
const pubsub = new PubSub();

export const orderItemResolver = {
  OrderItem: {
    order: (OrderItem: OrderItemInstance, args, {db}: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Order.findById<OrderInstance>(OrderItem.orderId);
    },
    item: (OrderItem: OrderItemInstance, args, {db}: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Item.findById<ItemInstance>(OrderItem.itemId);
    }
  },
  Query: {
    order: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeClient)(
      async (parent, args, {entityAuthenticated, db}: ResolverContext) => {
        // get orderId from client token
        const clientEntityAuth = <ClientEntityAuthenticated>entityAuthenticated;

        // get order from client entity authenticated
        const order = await db!.Order.findById<OrderInstance>(clientEntityAuth.order);

        // check if client has order
        if (!order)
          throw new Error('Order not found');

        // return order
        return order;
      }
    )
  },
  Mutation: {
    createOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeClient)(
      async (parent, {input}, {db, entityAuthenticated}: ResolverContext) => {
        const {itemId} = <CreateOrderItem>input;
        const {order: orderId} = <ClientEntityAuthenticated>entityAuthenticated;

        // check order
        const order = await db!.Order.findById(orderId);
        if (!order)
          throw new Error('Order not found');

        // todo: check if item exist
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
      async (parent, {input}, {db, entityAuthenticated}: ResolverContext) => {
        const {orderItemId} = <RemoveOrderItem>input;
        const {order: orderId} = <ClientEntityAuthenticated>entityAuthenticated;

        // check order
        const order = await db!.Order.findById<OrderInstance>(orderId);
        if (!order)
          throw new Error('Order not found');

        // get orderItem
        const orderItem = await db!.OrderItem.findById<OrderItemInstance>(orderItemId);
        if (!orderItem)
          throw new Error('OrderItem not found');

        // remove order item
        return db!.OrderItem.prototype.remove(orderItem);
      }
    ),
    doingOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeCollaborator)(
      async (parent, {input}, {db}: ResolverContext) => {
        const param: DoingOrderItem = input;
        // todo - check if order item belongs to restaurant from collaborator authenticated
        const orderItem = await db!.OrderItem.findById(param.orderItemId);

        if (!orderItem)
          throw new Error('OrderItem not found');

        if (orderItem.status !== OrderItemStatusEnum.PENDING)
          throw new Error('This OrderItem can not be updated');

        const orderItemUpdated = await orderItem.updateAttributes({
          status: OrderItemStatusEnum.DOING,
          doingAt: new Date(),
        });

        console.log('order item updated', orderItemUpdated);
        await pubsub.publish(ORDER_ITEM_STATUS_UPDATED, {
          orderItemStatusUpdated: orderItemUpdated
        });

        return orderItemUpdated;
      }
    ),
    doneOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeCollaborator)(
      async (parent, {input}, {db}: ResolverContext) => {
        const param: DoneOrderItem = input;
        // todo - check if order item belongs to restaurant from collaborator authenticated
        const orderItem = await db!.OrderItem.findById(param.orderItemId);

        if (!orderItem)
          throw new Error('OrderItem not found');

        if (orderItem.status !== OrderItemStatusEnum.DOING)
          throw new Error('This OrderItem can not be updated');

        const orderItemUpdated = await orderItem.updateAttributes({
          status: OrderItemStatusEnum.DONE,
          doneAt: new Date(),
        });

        await pubsub.publish(ORDER_ITEM_STATUS_UPDATED, {
          orderItemStatusUpdated: orderItemUpdated
        });

        return orderItemUpdated;
      }
    ),
    deliveredOrderItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeCollaborator)(
      async (parent, {input}, {db}: ResolverContext) => {
        const param: DeliveredOrderItem = input;
        // todo - check if order item belongs to restaurant from collaborator authenticated
        const orderItem = await db!.OrderItem.findById(param.orderItemId);

        if (!orderItem)
          throw new Error('OrderItem not found');

        if (orderItem.status !== OrderItemStatusEnum.DONE)
          throw new Error('This OrderItem can not be updated');

        const orderItemUpdated = await orderItem.updateAttributes({
          status: OrderItemStatusEnum.DELIVERED,
          deliveredAt: new Date(),
        });

        await pubsub.publish(ORDER_ITEM_STATUS_UPDATED, {
          orderItemStatusUpdated: orderItemUpdated
        });

        return orderItemUpdated;
      }
    )
  },
  Subscription: {
    orderItemStatusUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_ITEM_STATUS_UPDATED),
        (payload, variables) => {
          console.log('what is the payload', payload)
          console.log('what is the variables', variables)
          return true
        }
      )
    }
  }
};
