const categoryTypes = `
  # Category definition types
  type Category {
    id: ID!
    restaurant: Restaurant!
    name: String!
    icon: String
    created_at: String!
    updated_at: String!
  }
  
  input CreateCategoryInput {
    restaurant: String
    name: String
    icon: String
  }
`;

const categoryQueries = `
  categories: [Category!]!
`;

const categoryMutations = `
  createCategory(input: CreateCategoryInput!): Category!
`;

export { categoryTypes, categoryQueries, categoryMutations }
