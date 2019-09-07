"use strict";
exports.__esModule = true;
var collaboratorTypes = "\n  # Collaborator definition types\n  type Collaborator {\n    id: ID!\n    name: String!\n    email: String!\n    password: String!\n    collaboratorsAccess: [CollaboratorAccess!]!\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  input CreateCollaboratorInput {\n    name: String!\n    email: String!\n    password: String!\n  }\n";
exports.collaboratorTypes = collaboratorTypes;
var collaboratorQueries = "\n  collaborators(first: Int, offset: Int): [Collaborator!]!\n";
exports.collaboratorQueries = collaboratorQueries;
var collaboratorMutations = "\n  createCollaborator(input: CreateCollaboratorInput!): Collaborator!\n";
exports.collaboratorMutations = collaboratorMutations;
