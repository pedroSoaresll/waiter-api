import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { sign } from 'jsonwebtoken';
import { isEmail } from 'validator';
import Logger from '../../../utils/logger';
import { JWT_SECRET } from '../../../utils/utils';
import { info } from 'winston';
import { genSalt, genSaltSync, hashSync } from 'bcryptjs';

const logger = Logger('GRAPHQL:RESTAURANT:RESOLVER');


export interface CreateRestaurantInput {
  name: string
  displayName: string
  email: string
  password: string
}

export const restaurantResolvers = {
  Query: {
    restaurants: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Restaurant.findAll().catch(error => {
        logger.error('error to create a new estabelecimento', { error });
        throw new Error('Houve um problema ao tentar buscar os estabelecimentos');
      });
    }
  },
  Mutation: {
    createRestaurant: (parent, { input }: { input: CreateRestaurantInput }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      logger.info('create restaurant input', { input });

      const name = input.name.trim();
      if (!name) throw new Error('Nome do restaurante não é válido');

      const saltRounds = 10;
      const myPlaintextPassword = 's0/\/\P4$$w0rD';
      const someOtherPlaintextPassword = 'not_bacon';
      const saltGenerated = genSaltSync(saltRounds);
      const passwordEncrypted = hashSync(input.password, saltGenerated);

      if (!isEmail(input.email))
        throw new Error('E-email informado não é válido');

      return db.Restaurant.create({
        name,
        email: input.email,
        password: passwordEncrypted
      }).catch(error => {
        logger.error('error to create a new estabelecimento', { error });
        throw new Error('Houve um problema ao tentar criar um novo estabelecimento');
      });
    }
  }
};