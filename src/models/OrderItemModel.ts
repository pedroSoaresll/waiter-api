import * as Sequelize from 'sequelize';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ItemInstance } from './ItemModel';

export interface OrderItemAttributes {
  id?: string
  itemId?: string
  orderId?: string
  status?: OrderItemStatusEnum
  createdAt?: Date
  updatedAt?: Date
  doingAt?: Date
  doneAt?: Date
  item?: ItemInstance
}

export enum OrderItemStatusEnum {
  CANCELED = 'CANCELED',
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
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM([
        OrderItemStatusEnum.CANCELED,
        OrderItemStatusEnum.PENDING,
        OrderItemStatusEnum.DOING,
        OrderItemStatusEnum.DONE,
      ]),
      allowNull: false
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
      },
      as: 'item'
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
