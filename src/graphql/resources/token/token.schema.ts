const tokenTypes = `
  type Token {
    token: String!
  }
  
  input CreateTokenToCollaboratorInput {
    restaurantName: String!
    email: String!
    password: String!
  }
  
  input CreateTokenToClientInput {
    restaurantId: ID!
    tableId: ID!
    clientName: String!
  }
`;

const tokenMutation = `
  createTokenToCollaborator(input: CreateTokenToCollaboratorInput!): Token
  createTokenToClient(input: CreateTokenToClientInput!): Token
`;

export { tokenTypes, tokenMutation };
