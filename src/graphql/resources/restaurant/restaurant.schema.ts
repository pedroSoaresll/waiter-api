const restaurantTypes = `
  # Restaurant definition types
  type Restaurant {
    id: ID!
    name: String!
    created_at: String!
    updated_at: String!
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
