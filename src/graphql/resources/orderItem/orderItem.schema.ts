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
  
  enum OrderItemStatusEnum {
    PENDING
    DOING
    DONE
  }
`;

const orderItemQueries = ``;

const orderItemMutations = ``;

export { orderItemTypes, orderItemQueries, orderItemMutations }
