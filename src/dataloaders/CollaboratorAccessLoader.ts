import { CollaboratorAccessInstance, CollaboratorAccessModel } from '../models/CollaboratorAccessModel';

export class CollaboratorAccessLoader {
  static batchCollaboratorAccess(collaboratorAccess: CollaboratorAccessModel, ids: string[]): Promise<CollaboratorAccessInstance[]> {
    return Promise.resolve<CollaboratorAccessInstance[]>(
      collaboratorAccess.findAll({
        where: {
          id: {
            $in: ids
          }
        }
      })
    );
  }

  static batchCollaboratorAccessCollaborator(collaboratorAccess: CollaboratorAccessModel, collaboratorIds: string[]): Promise<CollaboratorAccessInstance[]> {
    return Promise.resolve<CollaboratorAccessInstance[]>(
      collaboratorAccess.findAll({
        where: {
          collaborator: {
            $in: collaboratorIds
          }
        }
      })
    );
  }

  static batchCollaboratorAccessRestaurant(collaboratorAccess: CollaboratorAccessModel, restaurantIds: string[]): Promise<CollaboratorAccessInstance[]> {
    return Promise.resolve<CollaboratorAccessInstance[]>(
      collaboratorAccess.findAll({
        where: {
          restaurant: {
            $in: restaurantIds
          }
        }
      })
    );
  }
}