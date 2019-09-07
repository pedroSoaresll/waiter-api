"use strict";
exports.__esModule = true;
var tokenTypes = "\n  type Token {\n    token: String!\n  }\n  \n  input CreateTokenToCollaboratorInput {\n    restaurantName: String!\n    email: String!\n    password: String!\n  }\n  \n  input CreateTokenToClientInput {\n    restaurantId: ID!\n    tableId: ID!\n    clientName: String!\n  }\n";
exports.tokenTypes = tokenTypes;
var tokenMutation = "\n  createTokenToCollaborator(input: CreateTokenToCollaboratorInput!): Token\n  createTokenToClient(input: CreateTokenToClientInput!): Token\n";
exports.tokenMutation = tokenMutation;
