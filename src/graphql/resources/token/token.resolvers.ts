import { sign } from 'jsonwebtoken';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { compareStringBcrypt, JWT_SECRET } from '../../../utils/utils';
import Logger from '../../../utils/logger';
import { RestaurantInstance, RestaurantModel } from '../../../models/RestaurantModel';

const logger = Logger('GRAPHQL:TOKEN:RESOLVER');

export interface CreateTokenInput {
  email: string
  password: string
}

export const tokenResolvers = {
  Mutation: {
    createToken: (parent, { input }: { input: CreateTokenInput }, { db }: { db: DbConnection }) => {
      return db.Restaurant.findOne({
        where: { email: input.email }
      }).then(restaurant => {
        let errorMessage: string = 'Não foi localizado nenhum estabelecimento.';
        if (!restaurant)
          throw new Error(errorMessage);

        const isPassword = compareStringBcrypt(input.password, restaurant!.get('password'));
        if (!isPassword) {
          errorMessage = 'Não autorizado, e-mail ou senha incorretos';
          throw new Error(errorMessage);
        }

        const payload = {
          sub: restaurant.id
        };

        return {
          token: sign(payload, JWT_SECRET!)
        };
      });
    }
  }
};