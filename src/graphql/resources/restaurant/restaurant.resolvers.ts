import { GraphQLResolveInfo } from 'graphql';
import { CollaboratorAccessStatusEnum, CollaboratorAccessTypeEnum } from '../../../models/CollaboratorAccessModel';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import Logger from '../../../utils/logger';
import { generatePassword } from '../../../utils/utils';
import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';
import { RestaurantStatusEnum } from '../../../models/RestaurantModel';
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';

const logger = Logger('GRAPHQL:RESTAURANT:RESOLVER');


export interface CreateRestaurantInput {
  displayName: string
  collaboratorName: string
  email: string
  password: string
}

export const restaurantResolvers = {
  Restaurant: {
    collaboratorsAccess: (restaurant, args, { dataLoaders: { collaboratorAccessRestaurantLoader } }: { dataLoaders: DataLoaders }) => {
      return collaboratorAccessRestaurantLoader.loadMany([restaurant.id]);
    }
  },
  Query: {
    restaurants: compose<any, ResolverContext>(authResolver, verifyTokenResolver)((parent, args, { db }: ResolverContext, info: GraphQLResolveInfo) => {
      return db!.Restaurant.findAll().catch(error => {
        logger.error('error to create a new estabelecimento', { error });
        throw new Error('Houve um problema ao tentar buscar os estabelecimentos');
      });
    })
  },
  Mutation: {
    createRestaurant: async (parent, { input }: { input: CreateRestaurantInput }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      logger.info('create restaurant input', { input });

      try {
        // get restaurant's name
        const name = input.displayName
          .replace(/\s+/g, '-')
          .toLowerCase()
          .trim();

        // generate password
        const password = generatePassword(input.password);

        // create restaurant + collaborator + collaborator access
        const restaurant = await db.Restaurant.create({
          displayName: input.displayName,
          name,
          status: RestaurantStatusEnum.ACTIVE,
          collaboratorsAccess: {
            accessType: CollaboratorAccessTypeEnum.ADMIN,
            status: CollaboratorAccessStatusEnum.ACTIVE,
            inActivity: false,
            collaborator: {
              name: input.collaboratorName,
              email: input.email,
              password
            }
          }
        }, {
          include: [
            {
              model: db.CollaboratorAccess,
              as: 'collaboratorsAccess',
              include: [
                {
                  model: db.Collaborator,
                  as: 'collaborator'
                }
              ]
            }
          ]
        });

        if (!restaurant)
          throw new Error('Error to create CollaboratorAccess + Restaurant + Collaborator: ');

        logger.info('Data created', { collaboratorAccess: restaurant });

        return restaurant;

      } catch (e) {
        logger.error('Error in createRestaurant mutation: ', { e });
        throw e;
      }
    }
  }
};