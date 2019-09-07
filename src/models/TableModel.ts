import * as Sequelize from 'sequelize';
import * as qrcode from 'qrcode';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { QRCodeContentInterface } from '../interfaces/QRCodeContentInterface';

export interface TableAttributes {
  id?: string;
  restaurantId?: string;
  name?: string;
  qrcode?: string;
  status?: TableStatusEnum;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWithQRCodeInterface {
  name: string;
  restaurantId: string;
  status: TableStatusEnum;
}

export enum TableStatusEnum {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE'
}

export interface TableInstance extends Sequelize.Instance<TableAttributes>, TableAttributes {}

export interface TableModel extends BaseModelInterface, Sequelize.Model<TableInstance, TableAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): TableModel => {
  const Table: TableModel = sequelize.define('Table', {
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
    qrcode: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM(['INACTIVE', 'ACTIVE']),
      allowNull: false,
    },
  }, {
    tableName: 'tables',
    timestamps: true,
    name: {
      plural: 'tables',
      singular: 'table',
    },
  });

  Table.afterCreate(async (table: TableInstance) => {
    const qrcodeContent: QRCodeContentInterface = {
      restaurantId: table.restaurantId!,
      tableId: table.id!,
    };
    const qrcodeContentString = JSON.stringify(qrcodeContent);

    const qrcodeGenerated = await new Promise((resolve, reject) => {
      qrcode.toDataURL(qrcodeContentString, (err, result) => {
        if (!err) resolve(result);
        reject(err);
      });
    }).catch((error) => {
      console.log('error to generate qrcode', error);
      throw error;
    });

    return table.updateAttributes({
      qrcode: qrcodeGenerated,
    });
  });

  Table.associate = (models: ModelsInterface): void => {
    Table.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false,
        field: 'restaurant',
      },
      as: 'restaurant',
    });
  };

  Table.prototype.createWithQRCode = async ({ name, restaurantId, status }: CreateWithQRCodeInterface): Promise<TableInstance> => Table.create({
    name,
    restaurantId,
    status,
  }).catch((error) => {
    throw error;
  });

  return Table;
};
