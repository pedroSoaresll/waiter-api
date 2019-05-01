import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import Logger from '../../../utils/logger';

const logger = Logger('GRAPHQL:CLIENT:RESOLVER');

interface CreateClientInput {
  name: string
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
    },
    Mutation: {
      createClient: (parent, { input }: { input: CreateClientInput }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
        logger.info('create client input', { input });
        return db.Client.create({
          name: input.name
        }).catch(error => {
          logger.error('error to create a new client', { error });
          throw error;
        })
      }
    }
  }
;