import * as DataLoader from 'dataloader';
import { DbConnection } from '../interfaces/DbConnectionInterface';
import { DataLoaders } from '../interfaces/DataLoadersInterface';
import { RestaurantInstance } from '../models/RestaurantModel';
import { RestaurantLoader } from './RestaurantLoader';
import { CollaboratorAccessInstance } from '../models/CollaboratorAccessModel';
import { CollaboratorAccessLoader } from './CollaboratorAccessLoader';

export class DataLoaderFactory {
  constructor(private db: DbConnection) {
  }

  getLoaders(): DataLoaders {
    return {
      restaurantLoader: new DataLoader<string, RestaurantInstance>(
        (ids: string[]) => RestaurantLoader.batchRestaurants(this.db.Restaurant, ids)
      ),
      collaboratorAccessLoader: new DataLoader<string, CollaboratorAccessInstance>(
        (ids: string[]) => CollaboratorAccessLoader.batchCollaboratorAccess(this.db.CollaboratorAccess, ids)
      ),
      collaboratorAccessCollaboratorLoader: new DataLoader<string, CollaboratorAccessInstance>(
        (ids: string[]) => CollaboratorAccessLoader.batchCollaboratorAccessCollaborator(this.db.CollaboratorAccess, ids)
      )
    };
  }
}