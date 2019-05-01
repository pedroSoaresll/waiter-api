import { ClientModel } from '../models/ClientModel';
import { RestaurantModel } from '../models/RestaurantModel';
import { CategoryModel } from '../models/CategoryModel';
import { ItemModel } from '../models/ItemModel';
import { OrderModel } from '../models/OrderModel';
import { TableModel } from '../models/TableModel';
import { OrderItemModel } from '../models/OrderItemModel';
import { TableHistoryModel } from '../models/TableHistoryModel';

export interface ModelsInterface {
  Client: ClientModel
  Restaurant: RestaurantModel
  Category: CategoryModel
  Item: ItemModel
  Order: OrderModel
  Table: TableModel
  OrderItem: OrderItemModel
  TableHistory: TableHistoryModel
}