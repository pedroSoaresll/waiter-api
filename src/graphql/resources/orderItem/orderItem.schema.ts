const orderItemTypes = `
  # OrderItem definition types
  type OrderItem {
    id: ID!
    item: Item!
    order: Order!
    status: OrderItemStatusEnum!
    created_at: String!
    updated_at: String!
    doing_at: String
    done_at: String
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
