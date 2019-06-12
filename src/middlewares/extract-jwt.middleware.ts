import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/utils';
import db from '../models';
import { EntityAuthenticated } from '../interfaces/EntityAuthenticatedInterface';
import { CollaboratorInstance } from '../models/CollaboratorModel';
import { TokenInfo } from '../graphql/resources/token/token.resolvers';

export const extractJwtMiddleware = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    let authorization: string | undefined = req.get('authorization');
    let token: string | undefined = authorization ? authorization.split(' ')[1] : undefined;

    req['context'] = {};
    req['context']['authorization'] = authorization;

    if (!token) return next();

    jwt.verify(token, JWT_SECRET!, (err, decoded: any): void => {
      if (err) return next();

      let tokenInfo = <TokenInfo>decoded;

      db.Collaborator.findById(decoded.sub, {
        attributes: ['id', 'email'],
      })
        .then((result: CollaboratorInstance | null) => {
          if (result) {
            req['context']['entityAuthenticated'] = <EntityAuthenticated>{
              id: result.get('id'),
              email: result.get('email'),
              restaurant: tokenInfo.restaurantId
            };
          }

          return next();
        });
    });
  };
};