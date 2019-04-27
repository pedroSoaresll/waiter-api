import { categoryQueries } from './resources/category/category.schema'
import { clientQueries } from './resources/client/client.schema'
import { itemQueries } from './resources/item/item.schema'
import { orderQueries } from './resources/order/order.schema'
import { orderItemQueries } from './resources/orderItem/orderItem.schema'
import { restaurantQueries } from './resources/restaurant/restaurant.schema'
import { tableQueries } from './resources/table/table.schema'
import { tableHistoryQueries } from './resources/tableHistory/tableHistory.schema'

const Query = `
  type Query {
    ${ categoryQueries }
    ${ clientQueries }
    ${ itemQueries }
    ${ orderQueries }
    ${ orderItemQueries }
    ${ restaurantQueries }
    ${ tableQueries }
    ${ tableHistoryQueries }
  }
`;

export { Query }