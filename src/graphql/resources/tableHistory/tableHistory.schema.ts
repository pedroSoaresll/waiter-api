const tableHistoryTypes = `
  # TableHistory definition types
  type TableHistory {
    id: ID!
    table: Table!
    client: Client!
    order: Order!
    created_at: String!
    updated_at: String!
    unemployment_at: String!
  }
`;

const tableHistoryQueries = ``;

const tableHistoryMutations = ``;

export { tableHistoryTypes, tableHistoryQueries, tableHistoryMutations }
