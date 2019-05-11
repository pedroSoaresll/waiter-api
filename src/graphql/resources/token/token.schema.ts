const tokenTypes = `
  type Token {
    token: String!
  }
  
  input CreateTokenInput {
    restaurantName: String!
    email: String!
    password: String!
  }
`;

const tokenMutation = `
  createToken(input: CreateTokenInput!): Token
`;

export { tokenTypes, tokenMutation };