import { GraphQLFieldResolver } from 'graphql';
import * as jwt from 'jsonwebtoken';
import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../interfaces/ResolverContextInterface';
import { JWT_SECRET } from '../utils/utils';
import { ClientTokenInfo, TokenInfo } from '../graphql/resources/token/token.resolvers';

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> =
  (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {
    return (parent, args, context: ResolverContext, info) => {
      const token: string | undefined = context.authorization
        ? context.authorization.split(' ')[1]
        : undefined;

      return jwt.verify(token!, JWT_SECRET!, async (err, decoded: any) => {
        if (!err) {
          let tokenInfo = <TokenInfo>decoded;
          const errorMessage = 'The token do not have a valid content';

          if (tokenInfo.loginType === 'CLIENT') {
            const clientTokenInfo = <ClientTokenInfo>tokenInfo;
            // check if client exist
            const client = await context.db!.Client.findById(clientTokenInfo.sub);
            if (!client)
              throw new Error(errorMessage);

            // check if table exist
            const table = await context.db!.Table.findById(clientTokenInfo.tableId);
            if (!table)
              throw new Error(errorMessage);
          } else {
            // check if collaborator exist
            const collaboratorResult = await context.db!.Collaborator.findById(tokenInfo.sub);
            if (!collaboratorResult)
              throw new Error(errorMessage);
          }

          // check if restaurant exist
          const restaurantResult = await context.db!.Restaurant.findById(tokenInfo.restaurantId);
          if (!restaurantResult)
            throw new Error(errorMessage);

          return resolver(parent, args, context, info);
        }

        throw new Error(`${ err.name }: ${ err.message }`);
      });
    };
  };