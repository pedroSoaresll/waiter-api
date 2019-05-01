const restaurantTypes = `
  # Restaurant definition types
  type Restaurant {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateRestaurantInput {
    name: String!
  }
`;

const restaurantQueries = `
  restaurants: [Restaurant!]!
`;

const restaurantMutations = `
  createRestaurant(input: CreateRestaurantInput!): Restaurant!
`;

export { restaurantTypes, restaurantQueries, restaurantMutations }
