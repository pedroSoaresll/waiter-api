import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { ItemAttributes } from './ItemModel';
import { OrderAttributes } from './OrderModel';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface OrderItemAttributes {
  id: string
  item: ItemAttributes
  order: OrderAttributes
  status: OrderItemStatusEnum
  createdAt: Date
  updatedAt: Date
  doingAt: Date
  doneAt: Date
}

export enum OrderItemStatusEnum {
  PENDING = 'PENDING',
  DOING = 'DOING',
  DONE = 'DONE'
}

export interface OrderItemInstance extends Sequelize.Instance<OrderItemAttributes>, OrderItemAttributes {}

export interface OrderItemModel extends BaseModelInterface, Sequelize.Model<OrderItemInstance, OrderItemAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): OrderItemModel => {
  const OrderItem: OrderItemModel = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuid()
    },
    doingAt: {
      type: DataTypes.DATE,
    },
    doneAt: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'orderItems',
    timestamps: true
  });

  OrderItem.associate = (models: ModelsInterface): void => {
    OrderItem.belongsTo(models.Item, {
      foreignKey: {
        allowNull: false,
        field: 'item'
      }
    });

    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false,
        field: 'order'
      }
    });
  };

  return OrderItem;
}