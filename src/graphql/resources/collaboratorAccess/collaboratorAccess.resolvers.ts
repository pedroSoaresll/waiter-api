import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { GraphQLResolveInfo } from 'graphql';

export const collaboratorAccessResolver = {
  CollaboratorAccess: {
    restaurant: (collaboratorAccess, args, { dataLoaders: { restaurantLoader } }: { dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => {
      return restaurantLoader.load(collaboratorAccess.restaurantId);
    },
    collaborator: (collaboratorAccess, args, { dataLoaders: { collaboratorLoader } }: { dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => {
      // console.log(collaboratorAccess)
      console.log(collaboratorLoader.load(collaboratorAccess.collaboratorId))
      return collaboratorLoader.load(collaboratorAccess.collaboratorId);
    }
  }
};