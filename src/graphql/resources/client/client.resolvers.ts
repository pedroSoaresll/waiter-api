import { GraphQLResolveInfo } from 'graphql';

export const clientResolvers = {
  Query: {
    clients: (parent, args, context, info: GraphQLResolveInfo) => {
      console.log(parent);
      console.log(args);
      console.log(context);
      console.log(info);
      return '';
    }
  }
};