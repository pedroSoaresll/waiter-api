const tableTypes = `
  # Table definition types
  type Table {
    id: ID!
    restaurant: Restaurant!
    name: String!
    qrcode: String!
    status: TableStatusEnum!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateTableInput {
    restaurant: ID!
    name: String!
    status: TableStatusEnum
  }
  
  enum TableStatusEnum {
    INACTIVE
    ACTIVE
  }
`;

const tableQueries = `
  tables: [Table!]!
`;

const tableMutations = `
  createTable(input: CreateTableInput!): Table!
`;

export { tableTypes, tableQueries, tableMutations }
