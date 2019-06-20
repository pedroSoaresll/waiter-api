import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface ClientAttributes {
  id?: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ClientInstance extends Sequelize.Instance<ClientAttributes>, ClientAttributes {}

export interface ClientModel extends BaseModelInterface, Sequelize.Model<ClientInstance, ClientAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ClientModel => {

  return <ClientModel>sequelize.define('Client', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'clients',
    timestamps: true,
    name: {
      plural: 'clients',
      singular: 'client'
    }
  });
}
