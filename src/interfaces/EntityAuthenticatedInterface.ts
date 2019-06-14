import { CollaboratorAccessTypeEnum } from '../models/CollaboratorAccessModel';

export interface EntityAuthenticated {
  loginType: CollaboratorAccessTypeEnum | 'CLIENT'
  id?: string
  restaurant?: string
  table?: string
}