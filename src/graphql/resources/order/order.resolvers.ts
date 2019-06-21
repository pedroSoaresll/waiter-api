import { OrderInstance } from '../../../models/OrderModel';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { TableInstance } from '../../../models/TableModel';
import { ClientInstance } from '../../../models/ClientModel';
import { OrderItemInstance } from '../../../models/OrderItemModel';

export const orderResolver = {
  Order: {
    restaurant: (order: OrderInstance, args, { dataLoaders: { restaurantLoader } }: { dataLoaders: DataLoaders }) => {
      return restaurantLoader.load(order.restaurantId!);
    },
    table: (order: OrderInstance, args, { db }: { db: DbConnection }) => {
      return db.Table.findById<TableInstance>(order.tableId);
    },
    orderItems: (order: OrderInstance, args, { db }: { db: DbConnection }) => {
      return db.OrderItem.findAll<OrderItemInstance[]>({
        where: {
          orderId: order.id,
        },
      });
    },
    client: (order: OrderInstance, args, { db }: { db: DbConnection }) => {
      return db.Client.findById<ClientInstance>(order.clientId);
    }
  }
};
