import { DbConnection } from './DbConnectionInterface';
import { EntityAuthenticated } from './EntityAuthenticatedInterface';
import { DataLoaders } from './DataLoadersInterface';
import { RequestedFields } from '../ast/RequestedFields';
import { TokenInfo } from '../graphql/resources/token/token.resolvers';

export interface ResolverContext {
  db?: DbConnection
  authorization?: string
  entityAuthenticated?: EntityAuthenticated
  dataLoaders?: DataLoaders
  requestedFields?: RequestedFields
}