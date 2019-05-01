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
  
  enum TableStatusEnum {
    INACTIVE
    ACTIVE
  }
`;

const tableQueries = ``;

const tableMutations = ``;

export { tableTypes, tableQueries, tableMutations }
