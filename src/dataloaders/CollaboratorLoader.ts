import { CollaboratorInstance, CollaboratorModel } from '../models/CollaboratorModel';

export class CollaboratorLoader {
  static bathCollaborators(collaborator: CollaboratorModel, ids: string[]): Promise<CollaboratorInstance[]> {
    return Promise.resolve<CollaboratorInstance[]>(
      collaborator.findAll({
        where: {
          id: {
            $in: ids,
          },
        },
      }),
    );
  }
}
