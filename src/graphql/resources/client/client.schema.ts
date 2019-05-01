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
`;

const clientQueries = `
  clients: [Client!]!
  client(id: ID!): Client
`;

const clientMutations = `
  createClient(input: CreateClientInput!): Client!
`;

export { clientTypes, clientQueries, clientMutations }
