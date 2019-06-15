const itemTypes = `
  # Item definition types
  type Item {
    id: ID!
    category: Category!
    restaurant: Restaurant!
    name: String!
    amount: Float!
    status: ItemStatusEnum!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateItemInput {
    categoryId: String!
    name: String!
    amount: Float!
  }
  
  enum ItemStatusEnum {
    INACTIVE
    ACTIVE
  }
`;

const itemQueries = `
  items: [Item!]!
  itemsByCategory(category: String!): [Item!]!
`;

const itemMutations = `
  createItem(input: CreateItemInput!): Item!
`;

export { itemTypes, itemQueries, itemMutations }
