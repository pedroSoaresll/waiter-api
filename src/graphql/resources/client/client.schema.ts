const clientTypes = `
  # Client definition types
  type Client {
    id: ID!
    name: String
    createdAt: String!
    updatedAt: String!
  }
`;

const clientQueries = `
  clients: [Client!]!
`;

const clientMutations = ``;

export { clientTypes, clientQueries, clientMutations }
