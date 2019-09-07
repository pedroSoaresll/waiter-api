"use strict";
exports.__esModule = true;
var tableTypes = "\n  # Table definition types\n  type Table {\n    id: ID!\n    restaurant: Restaurant!\n    name: String!\n    qrcode: String!\n    status: TableStatusEnum!\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  input CreateTableInput {\n    restaurant: ID!\n    name: String!\n    status: TableStatusEnum\n  }\n  \n  enum TableStatusEnum {\n    INACTIVE\n    ACTIVE\n  }\n";
exports.tableTypes = tableTypes;
var tableQueries = "\n  tables: [Table!]!\n";
exports.tableQueries = tableQueries;
var tableMutations = "\n  createTable(input: CreateTableInput!): Table!\n";
exports.tableMutations = tableMutations;
