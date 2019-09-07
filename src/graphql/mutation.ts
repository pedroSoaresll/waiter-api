import { categoryMutations } from './resources/category/category.schema';
import { clientMutations } from './resources/client/client.schema';
import { itemMutations } from './resources/item/item.schema';
import { orderMutations } from './resources/order/order.schema';
import { orderItemMutations } from './resources/orderItem/orderItem.schema';
import { restaurantMutations } from './resources/restaurant/restaurant.schema';
import { tableMutations } from './resources/table/table.schema';
import { tableHistoryMutations } from './resources/tableHistory/tableHistory.schema';
import { tokenMutation } from './resources/token/token.schema';

const Mutation = `
  type Mutation {
    ${categoryMutations}
    ${clientMutations}
    ${itemMutations}
    ${orderMutations}
    ${orderItemMutations}
    ${restaurantMutations}
    ${tableMutations}
    ${tableHistoryMutations}
    ${tokenMutation}
  }
`;

export { Mutation };
