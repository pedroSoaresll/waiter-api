import { OrderInstance, OrderStatusEnum } from '../../../models/OrderModel';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { TableInstance } from '../../../models/TableModel';
import { ClientInstance } from '../../../models/ClientModel';
import { OrderItemInstance, OrderItemStatusEnum } from '../../../models/OrderItemModel';
import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { mustBeClient } from '../../../composables/must-be-client.resolver';
import { ClientEntityAuthenticated } from '../../../interfaces/EntityAuthenticatedInterface';

export const orderResolver = {
  Order: {
    restaurant: (order: OrderInstance, args, { dataLoaders: { restaurantLoader } }: { dataLoaders: DataLoaders }) => restaurantLoader.load(order.restaurantId!),
    table: (order: OrderInstance, args, { db }: { db: DbConnection }) => db.Table.findById<TableInstance>(order.tableId),
    orderItems: (order: OrderInstance, args, { db }: { db: DbConnection }) => db.OrderItem.findAll<OrderItemInstance[]>({
      where: {
        orderId: order.id,
      },
    }),
    client: (order: OrderInstance, args, { db }: { db: DbConnection }) => db.Client.findById<ClientInstance>(order.clientId),
  },
  Mutation: {
    closeOrder: compose<any, ResolverContext>(authResolver, verifyTokenResolver, mustBeClient)(
      async (parent, args, { entityAuthenticated, db }: ResolverContext, info) => {
        // get order
        const { order: orderId } = <ClientEntityAuthenticated>entityAuthenticated;
        const order = await db!.Order.find<OrderInstance>({
          where: {
            id: orderId,
          },
          include: [
            {
              model: db!.OrderItem,
              where: {
                orderId,
              },
              as: 'orderItems',
              include: [
                {
                  model: db!.Item,
                  as: 'item',
                },
              ],
            },
          ],
        });
        if (!order) throw new Error('Order not found');

        if (!order.orderItems!.length) throw new Error('Do not have items in this order');

        // check if all items are done, also can be canceled
        const canNotFinish = order.orderItems!.some(
          ((value) => [
            OrderItemStatusEnum.PENDING,
            OrderItemStatusEnum.DOING,
            OrderItemStatusEnum.DONE,
          ]
            .includes(value.status!)
          ),
        );

        if (canNotFinish) throw new Error('Can not finish this order because exist items pending');

        // calculate total price
        const totalPrice = order.orderItems!.reduce(((previousValue, currentValue) => currentValue.item!.amount! + previousValue), 0.00);

        // update order with total price, change status to finish
        return order.updateAttributes({
          status: OrderStatusEnum.FINISH,
          amount: totalPrice,
        });
      },
    ),
  },
};
