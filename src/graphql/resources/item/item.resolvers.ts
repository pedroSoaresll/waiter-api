import { DataLoaders } from '../../../interfaces/DataLoadersInterface';
import { ItemInstance, ItemStatusEnum } from '../../../models/ItemModel';
import { compose } from '../../../composables/composable.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { CollaboratorAccessTypeEnum } from '../../../models/CollaboratorAccessModel';
import { authResolver } from '../../../composables/auth.resolver';
import { verifyTokenResolver } from '../../../composables/verify-token.resolver';

interface CreateItemInput {
  categoryId: string;
  name: string;
  amount: number;
}

interface ItemsByCategoryInterface {
  category: string;
}

export const itemResolver = {
  Query: {
    items: compose<any, ResolverContext>(authResolver, verifyTokenResolver)(
      (parent, args, { entityAuthenticated, db }: ResolverContext) => db!.Item.findAll<ItemInstance>({
        where: {
          restaurantId: entityAuthenticated!.restaurant,
        },
      }),
    ),
    itemsByCategory: compose<any, ResolverContext>(authResolver, verifyTokenResolver)(
      (parent, args, { entityAuthenticated, db }: ResolverContext) => {
        const { category } = <ItemsByCategoryInterface> args;
        return db!.Item.findAll<ItemInstance>({
          where: {
            restaurantId: entityAuthenticated!.restaurant,
            categoryId: category,
          },
        });
      },
    ),
  },
  Mutation: {
    createItem: compose<any, ResolverContext>(authResolver, verifyTokenResolver)(
      (parent, { input }, { entityAuthenticated, db }: ResolverContext) => {
        const { restaurant: restaurantId, loginType } = entityAuthenticated!;
        // só o adm pode criar
        if (loginType !== CollaboratorAccessTypeEnum.ADMIN) throw new Error('Just ADM can create new items');

        const { name, categoryId, amount } = <CreateItemInput>input;
        return db!.Item.create({
          restaurantId,
          name,
          categoryId,
          amount,
          status: ItemStatusEnum.ACTIVE,
        });
      },
    ),
  },
  Item: {
    category: (item: ItemInstance, args, { dataLoaders: { categoryLoader } }: { dataLoaders: DataLoaders }) => categoryLoader.load(item.categoryId!),
    restaurant: (item: ItemInstance, args, { dataLoaders: { restaurantLoader } }: { dataLoaders: DataLoaders }) => restaurantLoader.load(item.restaurantId!),
  },
};
