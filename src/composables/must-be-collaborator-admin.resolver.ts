import { GraphQLFieldResolver } from 'graphql';
import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../interfaces/ResolverContextInterface';
import { CollaboratorAccessTypeEnum } from '../models/CollaboratorAccessModel';

export const mustBeCollaboratorAdmin: ComposableResolver<any, ResolverContext> = (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => (parent, args, context: ResolverContext, info) => {
  const collaboratorTypes = [
    CollaboratorAccessTypeEnum.ADMIN,
  ];

  if (collaboratorTypes.indexOf(<CollaboratorAccessTypeEnum>context.entityAuthenticated!.loginType) === -1) { throw new Error("You don't have permission to do that action"); }

  return resolver(parent, args, context, info);
};
