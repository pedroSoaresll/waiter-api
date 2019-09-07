const clientTypes = `
  # Client definition types
  type Client {
    id: ID!
    name: String
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateClientInput {
    name: String!
  }
  
  input InitSessionInput {
    name: String!
    restaurant: String!
    table: String!
  }
`;

const clientQueries = `
  clients: [Client!]!
  client(id: ID!): Client
`;

const clientMutations = `
  createClient(input: CreateClientInput!): Client!
  initSession(input: InitSessionInput!): Order
`;

export { clientTypes, clientQueries, clientMutations };
