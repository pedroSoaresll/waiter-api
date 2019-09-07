"use strict";
exports.__esModule = true;
var clientTypes = "\n  # Client definition types\n  type Client {\n    id: ID!\n    name: String\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  input CreateClientInput {\n    name: String!\n  }\n  \n  input InitSessionInput {\n    name: String!\n    restaurant: String!\n    table: String!\n  }\n";
exports.clientTypes = clientTypes;
var clientQueries = "\n  clients: [Client!]!\n  client(id: ID!): Client\n";
exports.clientQueries = clientQueries;
var clientMutations = "\n  createClient(input: CreateClientInput!): Client!\n  initSession(input: InitSessionInput!): Order\n";
exports.clientMutations = clientMutations;
