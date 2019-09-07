import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { CollaboratorAccessAttributes } from './CollaboratorAccessModel';
import { TableAttributes } from './TableModel';

export enum RestaurantStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface RestaurantAttributes {
  id?: string;
  name?: string;
  displayName?: string;
  collaboratorsAccess?: CollaboratorAccessAttributes;
  status?: RestaurantStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
  tables?: [TableAttributes];
}

export interface RestaurantInstance extends Sequelize.Instance<RestaurantAttributes>, RestaurantAttributes {}

export interface RestaurantModel extends BaseModelInterface, Sequelize.Model<RestaurantInstance, RestaurantAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): RestaurantModel => {
  const Restaurant: RestaurantModel = sequelize.define('Restaurant', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
      defaultValue: RestaurantStatusEnum.ACTIVE,
    },
  }, {
    tableName: 'restaurants',
    timestamps: true,
    name: {
      plural: 'restaurants',
      singular: 'restaurant',
    },
  });

  Restaurant.associate = (models: ModelsInterface) => {
    Restaurant.hasMany(models.CollaboratorAccess, {
      foreignKey: {
        allowNull: true,
      },
      as: 'collaboratorsAccess',
    });

    Restaurant.hasMany(models.Table, {
      foreignKey: {
        allowNull: true,
        field: 'restaurant',
      },
      as: 'tables',
    });
  };

  return Restaurant;
};
