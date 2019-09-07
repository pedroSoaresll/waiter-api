import * as Sequelize from 'sequelize';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ItemInstance } from './ItemModel';

export interface OrderItemAttributes {
  id?: string;
  itemId?: string;
  orderId?: string;
  status?: OrderItemStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
  doingAt?: Date;
  doneAt?: Date;
  item?: ItemInstance;
}

export enum OrderItemStatusEnum {
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  DOING = 'DOING',
  DONE = 'DONE',
  DELIVERED = 'DELIVERED',
}

export interface OrderItemInstance extends Sequelize.Instance<OrderItemAttributes>, OrderItemAttributes { }

export interface OrderItemModel extends BaseModelInterface, Sequelize.Model<OrderItemInstance, OrderItemAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): OrderItemModel => {
  const OrderItem: OrderItemModel = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status: {
      type: DataTypes.ENUM([
        OrderItemStatusEnum.CANCELED,
        OrderItemStatusEnum.PENDING,
        OrderItemStatusEnum.DOING,
        OrderItemStatusEnum.DONE,
        OrderItemStatusEnum.DELIVERED,
      ]),
      allowNull: false,
    },
    doingAt: {
      type: DataTypes.DATE,
    },
    doneAt: {
      type: DataTypes.DATE,
    },
    deliveredAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'orderItems',
    timestamps: true,
  });

  OrderItem.associate = (models: ModelsInterface): void => {
    OrderItem.belongsTo(models.Item, {
      foreignKey: {
        allowNull: false,
        field: 'item',
      },
      as: 'item',
    });

    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false,
        field: 'order',
      },
    });
  };

  OrderItem.prototype.remove = (orderItem: OrderItemInstance) => {
    // if orderItem is canceled return error
    if (orderItem.status === OrderItemStatusEnum.CANCELED) throw new Error('OrderItem is already canceled');

    // if orderItem is with done and doing status return error
    if (orderItem.status !== OrderItemStatusEnum.PENDING) throw new Error('This OrderItem can not be canceled');

    // change status orderItem to canceled
    return orderItem.updateAttributes({
      status: OrderItemStatusEnum.CANCELED,
    });
  };

  OrderItem.prototype.doing = (orderItem: OrderItemInstance) => {
    if (orderItem.status !== OrderItemStatusEnum.PENDING) throw new Error('This OrderItem can not be updated');

    return orderItem.updateAttributes({
      status: OrderItemStatusEnum.DOING,
      doingAt: new Date(),
    });
  };

  OrderItem.prototype.done = (orderItem: OrderItemInstance) => {
    if (orderItem.status !== OrderItemStatusEnum.DOING) throw new Error('This OrderItem can not be updated');

    return orderItem.updateAttributes({
      status: OrderItemStatusEnum.DONE,
      doneAt: new Date(),
    });
  };

  OrderItem.prototype.delivered = (orderItem: OrderItemInstance) => {
    if (orderItem.status !== OrderItemStatusEnum.DONE) throw new Error('This OrderItem can not be updated');

    return orderItem.updateAttributes({
      status: OrderItemStatusEnum.DELIVERED,
      deliveredAt: new Date(),
    });
  };

  return OrderItem;
};
