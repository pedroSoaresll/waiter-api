import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface RestaurantAttributes {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface RestaurantIntance extends Sequelize.Instance<RestaurantAttributes>, RestaurantAttributes {}

export interface RestaurantModel extends BaseModelInterface, Sequelize.Model<RestaurantIntance, RestaurantAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): RestaurantModel => {
  return <RestaurantModel>sequelize.define('Restaurant', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuid()
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'restaurants',
    timestamps: true,
  });
}