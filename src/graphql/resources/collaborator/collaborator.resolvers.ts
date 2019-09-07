import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import Logger from '../../../utils/logger';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { RequestedFields } from '../../../ast/RequestedFields';

const logger = Logger('CollaboratorResolver');

export interface CollaboratorsInput {
  first: number;
  offset: number;
}

export const collaboratorResolver = {
  Collaborator: {
    collaboratorsAccess: (collaborator, args, { dataLoaders: { collaboratorAccessCollaboratorLoader } }: { dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => collaboratorAccessCollaboratorLoader.loadMany([collaborator.id]),
  },
  Query: {
    collaborators: (parent, { first = 0, offset = 0 }: CollaboratorsInput, { db, requestedFields }: { db: DbConnection; requestedFields: RequestedFields }, info: GraphQLResolveInfo) => db.Collaborator.findAll({
      limit: first,
      offset,
      attributes: requestedFields.getFields(info, { keep: ['id'], exclude: ['collaboratorsAccess'] }),
    }).catch((error) => {
      logger.error('Error to find collaborators', { error });
      throw error;
    }),
  },
};
