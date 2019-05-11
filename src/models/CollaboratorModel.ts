import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { compareSync } from 'bcryptjs';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { CollaboratorAccessAttributes } from './CollaboratorAccessModel';

export interface CollaboratorAttributes {
  id?: string
  name?: string
  email?: string
  password?: string
  collaboratorsAccess?: [CollaboratorAccessAttributes]
  createdAt?: Date
  updatedAt?: Date
}

export interface CollaboratorInstance extends Sequelize.Instance<CollaboratorAttributes>, CollaboratorAttributes {}

export interface CollaboratorModel extends BaseModelInterface, Sequelize.Model<CollaboratorInstance, CollaboratorAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CollaboratorModel => {
  const Collaborator: CollaboratorModel = sequelize.define('Collaborator', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    tableName: 'collaborators',
    timestamps: true,
    name: {
      plural: 'collaborators',
      singular: 'collaborator'
    }
  });

  Collaborator.associate = (models: ModelsInterface) => {
    Collaborator.hasMany(models.CollaboratorAccess, {
      foreignKey: {
        allowNull: true,
      },
      as: 'collaboratorsAccess'
    })
  };

  Collaborator.prototype.isPassword = (passwordReceived: string, passwordStored: string): boolean => {
    if (!passwordReceived || !passwordStored) return false;
    return compareSync(passwordReceived, passwordStored);
  };

  return Collaborator;
}