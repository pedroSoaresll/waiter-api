import { DbConnection } from './DbConnectionInterface';
import { EntityAuthenticated } from './EntityAuthenticatedInterface';
import { DataLoaders } from './DataLoadersInterface';
import { RequestedFields } from '../ast/RequestedFields';

export interface ResolverContext {
  db?: DbConnection
  authorization?: string
  entityAuthentication?: EntityAuthenticated
  dataLoaders?: DataLoaders
  requestedFields?: RequestedFields
}