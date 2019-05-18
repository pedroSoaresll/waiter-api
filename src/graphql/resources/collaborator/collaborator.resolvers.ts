import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import Logger from '../../../utils/logger';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { RequestedFields } from '../../../ast/RequestedFields';

const logger = Logger('CollaboratorResolver');

export const collaboratorResolver = {
  Collaborator: {
    collaboratorsAccess: (collaborator, args, { dataLoaders: { collaboratorAccessCollaboratorLoader } }: { dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => {
      return collaboratorAccessCollaboratorLoader.loadMany([collaborator.id]);
    }
  },
  Query: {
    collaborators: (parent, args, { db, requestedFields }: { db: DbConnection, requestedFields: RequestedFields }, info: GraphQLResolveInfo) => {
      return db.Collaborator.findAll({
        attributes: requestedFields.getFields(info, { keep: ['id'], exclude: ['collaboratorsAccess'] })
      }).catch(error => {
        logger.error('Error to find collaborators', { error });
        throw error;
      });
    }
  }
};