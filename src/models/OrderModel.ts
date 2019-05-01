import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { RestaurantAttributes } from './RestaurantModel';
import { ClientAttributes } from './ClientModel';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { TableAttributes } from './TableModel';
import { OrderItemAttributes } from './OrderItemModel';

export interface OrderAttributes {
  id: string
  restaurant: RestaurantAttributes
  table: TableAttributes
  orderItems: [OrderItemAttributes]
  client: ClientAttributes
  amount: number
  status: OrderStatusEnum
  createdAt: Date
  updatedAt: Date
}

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  DOING = 'DOING',
  DONE = 'DONE',
}

export interface OrderInstance extends Sequelize.Instance<OrderAttributes>, OrderAttributes {}

export interface OrderModel extends BaseModelInterface, Sequelize.Model<OrderInstance, OrderAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): OrderModel => {
  const Order: OrderModel = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuid()
    },
    amount: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(['PENDING', 'DOING', 'DONE']),
      allowNull: false,
    },
  }, {
    tableName: 'orders',
    timestamps: true
  });

  Order.associate = (models: ModelsInterface): void => {
    Order.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false,
        field: 'restaurant'
      }
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        allowNull: false,
        field: 'orderItem'
      }
    });

    Order.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
        field: 'client'
      }
    })
  };

  return Order;
}