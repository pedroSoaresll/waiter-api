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
    deliveredAt: String
  }
  
  input CreateOrderItemInput {
    itemId: String!
  }
  
  input RemoveOrderItemInput {
    orderItemId: String!
  }
  
  input DoingOrderItemInput {
    orderItemId: String!
  }
  
  input DoneOrderItemInput {
    orderItemId: String!
  }
  
  input DeliveredOrderItemInput {
    orderItemId: String!
  }
  
  enum OrderItemStatusEnum {
    CANCELED
    PENDING
    DOING
    DONE
    DELIVERED
  }
`;

const orderItemQueries = `
  order: Order!
`;

const orderItemMutations = `
  createOrderItem(input: CreateOrderItemInput!): OrderItem!
  removeOrderItem(input: RemoveOrderItemInput!): OrderItem!
  doingOrderItem(input: DoingOrderItemInput!): OrderItem!
  doneOrderItem(input: DoneOrderItemInput!): OrderItem!
  deliveredOrderItem(input: DeliveredOrderItemInput!): OrderItem!
`;

export { orderItemTypes, orderItemQueries, orderItemMutations }
