import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { v4 as uuid } from 'uuid';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CategoryAttributes {
  id: string
  restaurant: string
  name: string
  icon?: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes {}

export interface CategoryModel extends BaseModelInterface, Sequelize.Model<CategoryInstance, CategoryAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CategoryModel => {
  const Category: CategoryModel = sequelize.define('Category', {
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
    icon: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'categories',
    timestamps: true,
  });

  Category.associate = (models: ModelsInterface): void => {
    Category.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false,
        field: 'restaurant',
      }
    });
  };

  return Category;
}