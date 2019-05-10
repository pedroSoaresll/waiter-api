import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface RestaurantAttributes {
  id?: string
  name?: string
  displayName?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RestaurantInstance extends Sequelize.Instance<RestaurantAttributes>, RestaurantAttributes {}

export interface RestaurantModel extends BaseModelInterface, Sequelize.Model<RestaurantInstance, RestaurantAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): RestaurantModel => {
  const Restaurant: RestaurantModel = sequelize.define('Restaurant', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuid()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'restaurants',
    timestamps: true,
  });

  return Restaurant;
}