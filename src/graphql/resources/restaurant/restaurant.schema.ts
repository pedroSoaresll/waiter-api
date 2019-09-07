const restaurantTypes = `
  # Restaurant definition types
  type Restaurant {
    id: ID!
    name: String!
    displayName: String!
    collaboratorsAccess: [CollaboratorAccess!]!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateRestaurantInput {
    displayName: String!
    collaboratorName: String!
    email: String!
    password: String!
  }
`;

const restaurantQueries = `
  restaurants: [Restaurant!]!
`;

const restaurantMutations = `
  createRestaurant(input: CreateRestaurantInput!): Restaurant!
`;

export { restaurantTypes, restaurantQueries, restaurantMutations };
