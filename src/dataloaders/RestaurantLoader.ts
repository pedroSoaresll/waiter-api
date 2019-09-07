import { RestaurantInstance, RestaurantModel } from '../models/RestaurantModel';

export class RestaurantLoader {
  static batchRestaurants(restaurant: RestaurantModel, ids: string[]): Promise<RestaurantInstance[]> {
    return Promise.resolve<RestaurantInstance[]>(
      restaurant.findAll({
        where: {
          id: {
            $in: ids,
          },
        },
      }),
    );
  }
}
