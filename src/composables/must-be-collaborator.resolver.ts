import { GraphQLFieldResolver } from 'graphql';
import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../interfaces/ResolverContextInterface';
import { CollaboratorAccessTypeEnum } from '../models/CollaboratorAccessModel';

export const mustBeCollaborator: ComposableResolver<any, ResolverContext> = (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => (parent, args, context: ResolverContext, info) => {
  const collaboratorTypes = [
    CollaboratorAccessTypeEnum.ADMIN,
    CollaboratorAccessTypeEnum.COMMON,
  ];

  if (!collaboratorTypes.includes(<CollaboratorAccessTypeEnum>context.entityAuthenticated!.loginType)) { throw new Error('You don\'t have permission to do this action'); }

  return resolver(parent, args, context, info);
};
