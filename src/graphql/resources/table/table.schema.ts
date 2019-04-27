const tableTypes = `
  # Table definition types
  type Table {
    id: ID!
    restaurant: Restaurant!
    name: String!
    qrcode: String!
    status: TableStatusEnum!
    created_at: String!
    updated_at: String!
  }
  
  enum TableStatusEnum {
    INACTIVE
    ACTIVE
  }
`;

const tableQueries = ``;

const tableMutations = ``;

export { tableTypes, tableQueries, tableMutations }
