import { DbConnection } from './DbConnectionInterface';
import { EntityAuthenticated } from './EntityAuthenticatedInterface';
import { DataLoaders } from './DataLoadersInterface';

export interface ResolverContext {
  db?: DbConnection
  authorization?: string
  entityAuthentication?: EntityAuthenticated
  dataLoaders?: DataLoaders
}