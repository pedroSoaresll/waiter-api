import { GraphQLResolveInfo } from 'graphql';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';

export const collaboratorAccessResolver = {
  CollaboratorAccess: {
    restaurant: (collaboratorAccess, args, { dataLoaders: { restaurantLoader } }: { dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => restaurantLoader.load(collaboratorAccess.restaurantId),
    collaborator: (collaboratorAccess, args, { dataLoaders: { collaboratorLoader } }: { dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => collaboratorLoader.load(collaboratorAccess.collaboratorId),
  },
};
