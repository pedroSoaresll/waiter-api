import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/utils';
import db from '../models';
import {
  ClientEntityAuthenticated,
  CollaboratorEntityAuthenticated,
  EntityAuthenticated,
} from '../interfaces/EntityAuthenticatedInterface';
import { CollaboratorAttributes, CollaboratorInstance } from '../models/CollaboratorModel';
import { ClientTokenInfo, TokenInfo } from '../graphql/resources/token/token.resolvers';
import { ClientAttributes, ClientInstance } from '../models/ClientModel';

export const extractJwtMiddleware = (): RequestHandler => (req: any, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.get('authorization');
  const token: string | undefined = authorization ? authorization.split(' ')[1] : undefined;

  req.context = {};
  req.context.authorization = authorization;

  if (!token) return next();

  return jwt.verify(token, JWT_SECRET!, async (err, decoded: any) => {
    if (err) return next();

    let entityAuthenticated: EntityAuthenticated;
    const { restaurantId: restaurant, sub: id, loginType } = <TokenInfo>decoded;

    if (loginType === 'CLIENT') {
      const { tableId: table, orderId: order } = <ClientTokenInfo>decoded;
      const client = await db.Client.findById<ClientInstance>(id);

      if (!client) return next();

      entityAuthenticated = <ClientEntityAuthenticated>{
        id,
        loginType,
        restaurant,
        table,
        order,
      };
    } else {
      const collaborator = await db.Collaborator.findById<CollaboratorAttributes>(id, {
        attributes: ['id'],
      });

      if (!collaborator) return next();

      entityAuthenticated = <CollaboratorEntityAuthenticated>{
        id,
        restaurant,
        loginType,
      };
    }

    req.context.entityAuthenticated = entityAuthenticated;

    return next();
  });
};
