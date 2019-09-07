import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CategoryAttributes {
  id?: string;
  restaurantId?: string;
  name?: string;
  icon?: string;
  status?: CategoryStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CategoryStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes {}

export interface CategoryModel extends BaseModelInterface, Sequelize.Model<CategoryInstance, CategoryAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CategoryModel => {
  const Category: CategoryModel = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM([CategoryStatusEnum.ACTIVE, CategoryStatusEnum.INACTIVE]),
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
      },
    });
  };

  return Category;
};
