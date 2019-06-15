import * as DataLoader from 'dataloader';
import { RestaurantInstance } from '../models/RestaurantModel';
import { CollaboratorAccessInstance } from '../models/CollaboratorAccessModel';
import { CollaboratorInstance } from '../models/CollaboratorModel';
import { CategoryInstance } from '../models/CategoryModel';

export interface DataLoaders {
  restaurantLoader: DataLoader<string, RestaurantInstance>
  categoryLoader: DataLoader<string, CategoryInstance>
  collaboratorLoader: DataLoader<string, CollaboratorInstance>
  collaboratorAccessLoader: DataLoader<string, CollaboratorAccessInstance>
  collaboratorAccessCollaboratorLoader: DataLoader<string, CollaboratorAccessInstance>
  collaboratorAccessRestaurantLoader: DataLoader<string, CollaboratorAccessInstance>
}
