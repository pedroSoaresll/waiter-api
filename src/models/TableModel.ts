import * as Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import * as qrcode from 'qrcode';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface TableAttributes {
  id?: string
  // restaurant?: RestaurantAttributes
  restaurantId?: string
  name?: string
  qrcode?: string
  status?: TableStatusEnum
  createdAt?: string
  updatedAt?: string
}

export enum TableStatusEnum {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE'
}

export interface TableInstance extends Sequelize.Instance<TableAttributes>, TableAttributes {}

export interface TableModel extends BaseModelInterface, Sequelize.Model<TableInstance, TableAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): TableModel => {
  const uuidGenerated = uuid();
  const getQrCode = () => {
    let result = null;
    qrcode.toDataURL(uuidGenerated, (err, rt) => {
      result = rt;
    });

    return function () {
      return result;
    };
  };

  const Table: TableModel = sequelize.define('Table', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidGenerated
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qrcode: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: getQrCode()
    },
    status: {
      type: DataTypes.ENUM(['INACTIVE', 'ACTIVE']),
      allowNull: false,
    },
  }, {
    tableName: 'tables',
    timestamps: true
  });

  Table.associate = (models: ModelsInterface): void => {
    Table.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false,
        field: 'restaurant',
      },
      as: 'restaurant'
    });
  };

  return Table;
}
