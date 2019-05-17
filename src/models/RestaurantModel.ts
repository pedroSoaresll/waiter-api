import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { CollaboratorAccessAttributes } from './CollaboratorAccessModel';

export enum RestaurantStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface RestaurantAttributes {
  id?: string
  name?: string
  displayName?: string
  collaboratorsAccess?: CollaboratorAccessAttributes
  status?: RestaurantStatusEnum
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
    status: {
      type: DataTypes.ENUM([RestaurantStatusEnum.ACTIVE, RestaurantStatusEnum.INACTIVE]),
      allowNull: false,
      defaultValue: RestaurantStatusEnum.ACTIVE
    }
  }, {
    tableName: 'restaurants',
    timestamps: true,
    name: {
      plural: 'restaurants',
      singular: 'restaurant'
    }
  });

  Restaurant.associate = (models: ModelsInterface) => {
    Restaurant.hasMany(models.CollaboratorAccess, {
      foreignKey: {
        allowNull: true,
      },
      as: 'collaboratorsAccess'
    })
  };

  return Restaurant;
}