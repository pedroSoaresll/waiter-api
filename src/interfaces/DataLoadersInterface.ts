import * as DataLoader from 'dataloader';
import { RestaurantInstance } from '../models/RestaurantModel';
import { CollaboratorAccessInstance } from '../models/CollaboratorAccessModel';

export interface DataLoaders {
  restaurantLoader: DataLoader<string, RestaurantInstance>
  collaboratorAccessLoader: DataLoader<string, CollaboratorAccessInstance>
  collaboratorAccessCollaboratorLoader: DataLoader<string, CollaboratorAccessInstance>
}