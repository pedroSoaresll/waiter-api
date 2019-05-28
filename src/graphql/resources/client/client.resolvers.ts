import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import Logger from '../../../utils/logger';

const logger = Logger('GRAPHQL:CLIENT:RESOLVER');

interface CreateClientInput {
  name: string
}

interface InitSessionInput {
  name: string
  restaurant: string
  table: string
}

export const clientResolvers = {
  Query: {
    clients: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Client.findAll()
        .catch(error => {
          logger.error('error to get all clients', { error });
          throw error;
        });
    },
    client: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Client.findOne({
        where: {
          id: args.id
        },
        limit: 1
      }).catch(error => {
        logger.error('error to get client', { error });
        throw error;
      });
    }
  },
  Mutation: {
    createClient: (parent, { input }: { input: CreateClientInput }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      logger.info('create client input', { input });

      const name = input.name.trim();
      if (!name) throw new Error('Nome de cliente não é válido');

      return db.Client.create({
        name
      }).catch(error => {
        logger.error('error to create a new client', { error });
        throw error;
      });
    },
    initSession: (parent, { input }: { input: InitSessionInput }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      // todo create client
      // todo create restaurant
      // todo create order and set client + restaurant + table
    }
  }
};