const tableHistoryTypes = `
  # TableHistory definition types
  type TableHistory {
    id: ID!
    table: Table!
    client: Client!
    order: Order!
    createdAt: String!
    updatedAt: String!
    unemploymentAt: String!
  }
`;

const tableHistoryQueries = '';

const tableHistoryMutations = '';

export { tableHistoryTypes, tableHistoryQueries, tableHistoryMutations };
