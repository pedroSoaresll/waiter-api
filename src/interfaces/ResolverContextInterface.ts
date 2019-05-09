import { DbConnection } from './DbConnectionInterface';
import { EntityAuthenticated } from './EntityAuthenticatedInterface';

export interface ResolverContext {
  db?: DbConnection
  authorization?: string
  entityAuthentication?: EntityAuthenticated
}