const itemTypes = `
  # Item definition types
  type Item {
    id: ID!
    category: Category!
    restaurant: Restaurant!
    name: String!
    amount: String!
    status: ItemStatusEnum!
    created_at: String!
    updated_at: String!
  }
  
  enum ItemStatusEnum {
    INACTIVE
    ACTIVE
  }
`;

const itemQueries = ``;

const itemMutations = ``;

export { itemTypes, itemQueries, itemMutations }
