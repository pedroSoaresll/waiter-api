const categoryTypes = `
  # Category definition types
  type Category {
    id: ID!
    restaurant: Restaurant!
    name: String!
    icon: String
    createdAt: String!
    updatedAt: String!
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
