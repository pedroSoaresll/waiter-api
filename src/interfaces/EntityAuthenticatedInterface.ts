import { CollaboratorAccessTypeEnum } from '../models/CollaboratorAccessModel';

export interface ClientEntityAuthenticated extends EntityAuthenticated {
  table: string;
  order: string;
}

export interface CollaboratorEntityAuthenticated extends EntityAuthenticated {}

export interface EntityAuthenticated {
  loginType: CollaboratorAccessTypeEnum | 'CLIENT';
  id?: string;
  restaurant: string;
}
