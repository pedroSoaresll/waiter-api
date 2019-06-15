import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface ItemAttributes {
  id?: string
  categoryId?: string
  restaurantId?: string
  name?: string
  amount?: number
  status?: ItemStatusEnum
  createdAt?: Date
  updatedAt?: Date
}

export enum ItemStatusEnum {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE'
}

export interface ItemInstance extends Sequelize.Instance<ItemAttributes>, ItemAttributes {}

export interface ItemModel extends BaseModelInterface, Sequelize.Model<ItemInstance, ItemAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ItemModel => {
  const Item: ItemModel = sequelize.define('Item', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuid()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(['INACTIVE', 'ACTIVE']),
      allowNull: false,
    }
  }, {
    tableName: 'items',
    timestamps: true,
  });

  Item.associate = (models: ModelsInterface): void => {
    Item.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false,
        field: 'restaurant'
      },
      as: 'restaurant'
    });

    Item.belongsTo(models.Category, {
      foreignKey: {
        allowNull: true,
        field: 'category'
      },
      as: 'category'
    })
  };

  return Item;
}
