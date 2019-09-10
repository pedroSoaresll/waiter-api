import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { DbConnection } from '../interfaces/DbConnectionInterface';

const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || 'development';

let db;

if (!db) {
  db = {};

  const { Op } = Sequelize;
  const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
  };
  
  const sequelize: Sequelize.Sequelize = new Sequelize(process.env.DATABASE!, process.env.USERNAME!, process.env.PASSWORLD!, {
    operatorsAliases,
    dialect: process.env.DIALECT,
  });

  fs
    .readdirSync(__dirname)
    .filter((file: string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
    .forEach((file: string) => {
      const model = sequelize.import(path.join(__dirname, file));
      // @ts-ignore
      db[model.name] = model;
    });

  Object.keys(db)
    .forEach((modelName: string) => {
      if (db[modelName].associate) { db[modelName].associate(db); }
    });

  db.sequelize = sequelize;
}

export default <DbConnection>db;
