import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface OrderAttributes {
  id?: string
  restaurantId?: string
  tableId?: string
  clientId?: string
  amount?: number
  status?: OrderStatusEnum
  createdAt?: Date
  updatedAt?: Date
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
      defaultValue: DataTypes.UUIDV4
    },
    amount: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    status: {
      type: DataTypes.ENUM(['PENDING', 'DOING', 'DONE']),
      allowNull: false,
    },
  }, {
    tableName: 'orders',
    timestamps: true,
    name: {
      plural: 'orders',
      singular: 'order'
    }
  });

  Order.associate = (models: ModelsInterface): void => {
    Order.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false,
        field: 'restaurant'
      },

    });

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        allowNull: true,
        field: 'order'
      }
    });

    Order.belongsTo(models.Table, {
      foreignKey: {
        allowNull: false,
        field: 'table'
      }
    });

    Order.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
        field: 'client'
      }
    });
  };

  return Order;
}
