import { GraphQLFieldResolver } from 'graphql';
import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../interfaces/ResolverContextInterface';

export const authResolver: ComposableResolver<any, ResolverContext> = (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => (parent, args, context: ResolverContext, info) => {
  if (context.entityAuthenticated || context.authorization) return resolver(parent, args, context, info);

  throw new Error('Unauthorized! Token not provided');
};
