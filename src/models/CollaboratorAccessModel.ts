import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { RestaurantAttributes } from './RestaurantModel';
import { CollaboratorAttributes } from './CollaboratorModel';
import { ModelsInterface } from '../interfaces/ModelsInterface';

enum CollaboratorAccessTypeEnum {
  ADMIN = 'ADMIN',
  COMMON = 'COMMON',
}

enum CollaboratorAccessStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface CollaboratorAccessAttributes {
  id?: string
  restaurant?: RestaurantAttributes
  collaborator?: CollaboratorAttributes
  accessType?: CollaboratorAccessTypeEnum
  status?: CollaboratorAccessStatusEnum
  inActivity?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface CollaboratorAccessInstance extends Sequelize.Instance<CollaboratorAccessAttributes>, CollaboratorAccessAttributes {}

export interface CollaboratorAccessModel extends BaseModelInterface, Sequelize.Model<CollaboratorAccessInstance, CollaboratorAccessAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CollaboratorAccessModel => {
  const CollaboratorAccess: CollaboratorAccessModel = sequelize.define('CollaboratorAccess', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuid()
    },
    accessType: {
      type: DataTypes.ENUM(['ADMIN', 'COMMON']),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(['ACTIVE', 'INACTIVE']),
      allowNull: false,
    },
    inActivity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'collaborators_access',
    timestamps: true,
  });

  CollaboratorAccess.associate = (models: ModelsInterface): void => {
    CollaboratorAccess.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false,
        field: 'restaurant'
      }
    });

    CollaboratorAccess.belongsTo(models.Collaborator, {
      foreignKey: {
        allowNull: false,
        field: 'collaborator'
      }
    });
  };

  return CollaboratorAccess;
}