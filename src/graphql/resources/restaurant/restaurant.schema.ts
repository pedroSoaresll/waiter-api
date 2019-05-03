const restaurantTypes = `
  # Restaurant definition types
  type Restaurant {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateRestaurantInput {
    name: String!
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

export { restaurantTypes, restaurantQueries, restaurantMutations }
