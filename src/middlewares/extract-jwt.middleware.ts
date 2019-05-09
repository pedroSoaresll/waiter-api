import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/utils';
import db from '../models';
import { AuthTypes } from '../commons/enums/auth-types';
import { RestaurantInstance } from '../models/RestaurantModel';
import { EntityAuthenticated } from '../interfaces/EntityAuthenticated';

export const extractJwtMiddleware = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    let authorization: string | undefined = req.get('authorization');
    let token: string | undefined = authorization ? authorization.split(' ')[1] : undefined;

    req['context'] = {};
    req['context']['authorization'] = authorization;

    if (!token) return next();

    jwt.verify(token, JWT_SECRET!, (err, decoded: any): void => {
      if (err) return next();

      if (decoded.type === AuthTypes.RESTAURANT) {
        db.Restaurant.findById(decoded.sub, {
          attributes: ['id', 'email']
        })
          .then((result: RestaurantInstance | null) => {
            if (result) {
              req['context']['entityAuthenticated'] = <EntityAuthenticated>{
                id: result.get('id'),
                email: result.get('email')
              };
            }

            return next();
          });
      }
    });
  };
};