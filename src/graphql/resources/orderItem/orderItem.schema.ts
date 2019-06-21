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
  
  input RemoveOrderItemInput {
    orderItemId: String!
  }
  
  enum OrderItemStatusEnum {
    CANCELED
    PENDING
    DOING
    DONE
  }
`;

const orderItemQueries = ``;

const orderItemMutations = `
  createOrderItem(input: CreateOrderItemInput!): OrderItem!
  removeOrderItem(input: RemoveOrderItemInput!): OrderItem!
`;

export { orderItemTypes, orderItemQueries, orderItemMutations }
