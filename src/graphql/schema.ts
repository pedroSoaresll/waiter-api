import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
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

const resolvers = merge(
  clientResolvers
);

const SchemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Mutation,
    Query,
    categoryTypes,
    clientTypes,
    itemTypes,
    orderTypes,
    orderItemTypes,
    restaurantTypes,
    tableTypes,
    tableHistoryTypes,
  ],
  resolvers,
});