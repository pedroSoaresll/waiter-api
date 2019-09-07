const orderTypes = `
  # Order definition types
  type Order {
    id: ID!
    restaurant: Restaurant!
    table: Table!
    orderItems: [OrderItem!]!
    client: Client!
    amount: String
    status: OrderStatusEnum!
    createdAt: String!
    updatedAt: String!
  }
  
  enum OrderStatusEnum {
    PENDING
    DOING
    DONE
    FINISH
  }
`;

const orderQueries = '';

const orderMutations = `
  closeOrder: Order!
`;

export { orderTypes, orderQueries, orderMutations };
