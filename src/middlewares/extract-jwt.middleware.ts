import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/utils';
import db from '../models';
import { EntityAuthenticated } from '../interfaces/EntityAuthenticatedInterface';
import { CollaboratorAttributes, CollaboratorInstance } from '../models/CollaboratorModel';
import { ClientTokenInfo, TokenInfo } from '../graphql/resources/token/token.resolvers';
import { ClientAttributes } from '../models/ClientModel';

export const extractJwtMiddleware = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    let authorization: string | undefined = req.get('authorization');
    let token: string | undefined = authorization ? authorization.split(' ')[1] : undefined;

    req['context'] = {};
    req['context']['authorization'] = authorization;

    if (!token) return next();

    jwt.verify(token, JWT_SECRET!, async (err, decoded: any) => {
      if (err) return next();

      let entityAuthenticated: EntityAuthenticated;
      let { restaurantId: restaurant, sub: id, loginType } = <TokenInfo>decoded;

      if (loginType === 'CLIENT') {
        const { tableId: table } = <ClientTokenInfo>decoded;
        const client = await db.Client.findById<ClientAttributes>(id);

        if (!client)
          return next();

        entityAuthenticated = <EntityAuthenticated>{
          id,
          loginType,
          restaurant,
          table,
        };
      } else {
        const collaborator = await db.Collaborator.findById<CollaboratorAttributes>(id, {
          attributes: ['id'],
        });

        if (!collaborator)
          return next();

        entityAuthenticated = <EntityAuthenticated>{
          id,
          restaurant,
          loginType
        };
      }

      req['context']['entityAuthenticated'] = entityAuthenticated;

      return next();
    });
  };
};