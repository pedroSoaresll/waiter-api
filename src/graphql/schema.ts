import { makeExecutableSchema } from 'graphql-tools';
import { mergeWith } from 'lodash';
import { Mutation } from './mutation';
import { Query } from './query';
import { categoryTypes } from './resources/category/category.schema';
import { clientTypes } from './resources/client/client.schema';
import { itemTypes } from './resources/item/item.schema';
import { orderTypes } from './resources/order/order.schema';
import { orderItemTypes } from './resources/orderItem/orderItem.schema';
import { restaurantTypes } from './resources/restaurant/restaurant.schema';
import { tableTypes } from './resources/table/table.schema';
import { tableHistoryTypes } from './resources/tableHistory/tableHistory.schema';
import { clientResolvers } from './resources/client/client.resolvers';
import { tokenTypes } from './resources/token/token.schema';
import { tokenResolvers } from './resources/token/token.resolvers';
import { restaurantResolvers } from './resources/restaurant/restaurant.resolvers';
import { collaboratorTypes } from './resources/collaborator/collaborator.schema';
import { collaboratorAccessTypes } from './resources/collaboratorAccess/collaboratorAccess.schema';
import { collaboratorAccessResolver } from './resources/collaboratorAccess/collaboratorAccess.resolvers';
import { collaboratorResolver } from './resources/collaborator/collaborator.resolvers';
import { tableResolvers } from './resources/table/table.resolver';
import { categoryResolver } from './resources/category/category.resolvers';
import { itemResolver } from './resources/item/item.resolvers';
import { orderItemResolver } from './resources/orderItem/orderItem.resolvers';
import { orderResolver } from './resources/order/order.resolvers';

const resolvers = mergeWith(
  clientResolvers,
  tokenResolvers,
  restaurantResolvers,
  collaboratorAccessResolver,
  collaboratorResolver,
  tableResolvers,
  categoryResolver,
  itemResolver,
  orderItemResolver,
  orderResolver,
);

const SchemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
  
  type Subscription {
    orderItemStatusUpdated: OrderItem!
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Mutation,
    Query,
    categoryTypes,
    clientTypes,
    collaboratorAccessTypes,
    collaboratorTypes,
    itemTypes,
    orderTypes,
    orderItemTypes,
    restaurantTypes,
    tableTypes,
    tableHistoryTypes,
    tokenTypes,
  ],
  resolvers,
});
