import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import Logger from '../../../utils/logger';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';

const logger = Logger('CollaboratorResolver');

export const collaboratorResolver = {
  Collaborator: {
    collaboratorsAccess: (collaborator, args, { db, dataLoaders: { collaboratorAccessCollaboratorLoader } }: { db: DbConnection, dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => {
      return collaboratorAccessCollaboratorLoader.loadMany([collaborator.id]);
    }
  },
  Query: {
    collaborators: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Collaborator.findAll().catch(error => {
        logger.error('Error to find collaborators', { error });
        throw error;
      });
    }
  }
};