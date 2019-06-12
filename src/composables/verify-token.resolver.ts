import { GraphQLFieldResolver } from 'graphql';
import * as jwt from 'jsonwebtoken';
import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../interfaces/ResolverContextInterface';
import { JWT_SECRET } from '../utils/utils';
import { TokenInfo } from '../graphql/resources/token/token.resolvers';

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> =
  (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {
    return (parent, args, context: ResolverContext, info) => {
      const token: string | undefined = context.authorization
        ? context.authorization.split(' ')[1]
        : undefined;

      return jwt.verify(token!, JWT_SECRET!, async (err, decoded: any) => {
        if (!err) {
          let tokenInfo = <TokenInfo>decoded;

          // verify if is a valid collaborator
          const collaboratorResult = await context.db!.Collaborator.findById(tokenInfo.sub);
          const restaurantResult = await context.db!.Restaurant.findById(tokenInfo.restaurantId);

          if (!collaboratorResult || !restaurantResult)
            throw new Error('The token do not have a valid content');

          return resolver(parent, args, context, info);
        }

        throw new Error(`${ err.name }: ${ err.message }`);
      });
    };
  };