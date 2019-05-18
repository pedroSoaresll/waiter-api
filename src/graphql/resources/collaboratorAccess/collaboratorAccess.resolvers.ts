import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { GraphQLResolveInfo } from 'graphql';

export const collaboratorAccessResolver = {
  CollaboratorAccess: {
    restaurant: (collaboratorAccess, args, { dataLoaders: { restaurantLoader } }: { dataLoaders: DataLoaders }, info: GraphQLResolveInfo) => {
      return restaurantLoader.load(collaboratorAccess.restaurantId);
    }
  }
};