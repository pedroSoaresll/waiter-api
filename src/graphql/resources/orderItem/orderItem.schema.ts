const orderItemTypes = `
  # OrderItem definition types
  type OrderItem {
    id: ID!
    item: Item!
    order: Order!
    status: OrderItemStatusEnum!
    createdAt: String!
    updatedAt: String!
    doingAt: String
    doneAt: String
  }
  
  input CreateOrderItemInput {
    itemId: String!
  }
  
  enum OrderItemStatusEnum {
    PENDING
    DOING
    DONE
  }
`;

const orderItemQueries = ``;

const orderItemMutations = `
  createOrderItem(input: CreateOrderItemInput!): OrderItem!
`;

export { orderItemTypes, orderItemQueries, orderItemMutations }
