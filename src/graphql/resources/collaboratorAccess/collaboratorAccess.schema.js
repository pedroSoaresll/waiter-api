"use strict";
exports.__esModule = true;
var collaboratorAccessTypes = "\n  # CollaboratorAccess definition types\n  type CollaboratorAccess {\n    id: ID!\n    restaurant: Restaurant\n    collaborator: Collaborator!\n    accessType: CollaboratorAccessTypeEnum!\n    status: CollaboratorAccessStatusEnum!\n    inActivity: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n  \n  enum CollaboratorAccessTypeEnum {\n    ADMIN\n    COMMON\n  }\n  \n  enum CollaboratorAccessStatusEnum {\n    ACTIVE,\n    INACTIVE\n  }\n  \n  input CreateCollaboratorAccessInput {\n    todo: String!  \n  }\n";
exports.collaboratorAccessTypes = collaboratorAccessTypes;
var collaboratorAccessQueries = "\n  collaboratorAccess: [CollaboratorAccess!]!\n";
exports.collaboratorAccessQueries = collaboratorAccessQueries;
var collaboratorAccessMutations = "\n  createCollaboratorAccess(input: CreateCollaboratorAccessInput!): CollaboratorAccess!\n";
exports.collaboratorAccessMutations = collaboratorAccessMutations;
