import { ComposableResolver } from "./composable.resolver";
import { ResolverContext } from "../interfaces/ResolverContextInterface";
import { GraphQLFieldResolver } from "graphql";

export const mustBeClient: ComposableResolver<any, ResolverContext> =
  (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {
    return (parent, args, context: ResolverContext, info) => {
      const collaboratorTypes = [
        "CLIENT",
      ];

      if (!collaboratorTypes.includes(context.entityAuthenticated!.loginType))
        throw new Error("You don't have permission to do this action");

      return resolver(parent, args, context, info);
    }
  };
