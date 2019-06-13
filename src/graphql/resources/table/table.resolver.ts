import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { TableStatusEnum } from '../../../models/TableModel';

interface CreateTableInput {
  restaurant: string
  name: string
  status?: TableStatusEnum
}

export const tableResolvers = {
  Query: {},
  Mutation: {
    createTable: async (parent, { input: { name, restaurant, status } }: { input: CreateTableInput }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      // todo implement create table
      if (!name) throw new Error('Name is required');
      if (!restaurant) throw new Error('Restaurant ID is required');

      return db.Table.create({
        name,
        // @ts-ignore
        restaurantId: restaurant,
        status: status || TableStatusEnum.ACTIVE
      });
    }
  },
  Table: {
    restaurant: (table, args, {db}: {db: DbConnection}, info) => {
      return db.Restaurant.find({
        where: {
          id: table.restaurantId
        }
      })
    }
  }
};
