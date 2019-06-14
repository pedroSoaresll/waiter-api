const categoryTypes = `
  # Category definition types
  type Category {
    id: ID!
    restaurant: Restaurant!
    name: String!
    icon: String
    status: CategoryStatusEnum!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateCategoryInput {
    name: String!
    icon: String
  }
  
  enum CategoryStatusEnum {
    ACTIVE
    INACTIVE
  }
`;

const categoryQueries = `
  categories: [Category!]!
`;

const categoryMutations = `
  createCategory(input: CreateCategoryInput!): Category!
`;

export { categoryTypes, categoryQueries, categoryMutations }
