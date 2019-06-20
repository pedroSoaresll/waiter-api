import * as Sequelize from 'sequelize';
import { TableAttributes } from './TableModel';
import { ClientAttributes } from './ClientModel';
import { OrderAttributes } from './OrderModel';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface TableHistoryAttributes {
  id: string
  table: TableAttributes
  client: ClientAttributes
  order: OrderAttributes
  createdAt: Date
  updatedAt: Date
  unemploymentAt: Date
}

export interface TableHistoryInstance extends Sequelize.Instance<TableHistoryAttributes>, TableHistoryAttributes {}

export interface TableHistoryModel extends BaseModelInterface, Sequelize.Model<TableHistoryInstance, TableHistoryAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): TableHistoryModel => {
  const TableHistory: TableHistoryModel = sequelize.define('TableHistory', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    unemploymentAt: {
      type: DataTypes.DATE,
      comment: 'Time that the user exit'
    }
  }, {
    tableName: 'tableHistories',
    timestamps: true,
  });

  TableHistory.associate = (models: ModelsInterface): void => {
    TableHistory.belongsTo(models.Table, {
      foreignKey: {
        allowNull: false,
        field: 'table'
      }
    });

    TableHistory.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
        field: 'client'
      }
    });

    TableHistory.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false,
        field: 'order'
      }
    });
  };

  return TableHistory;
}
