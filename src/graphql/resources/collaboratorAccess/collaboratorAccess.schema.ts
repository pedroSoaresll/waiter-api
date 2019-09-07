const collaboratorAccessTypes = `
  # CollaboratorAccess definition types
  type CollaboratorAccess {
    id: ID!
    restaurant: Restaurant
    collaborator: Collaborator!
    accessType: CollaboratorAccessTypeEnum!
    status: CollaboratorAccessStatusEnum!
    inActivity: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  
  enum CollaboratorAccessTypeEnum {
    ADMIN
    COMMON
  }
  
  enum CollaboratorAccessStatusEnum {
    ACTIVE,
    INACTIVE
  }
  
  input CreateCollaboratorAccessInput {
    todo: String!  
  }
`;

const collaboratorAccessQueries = `
  collaboratorAccess: [CollaboratorAccess!]!
`;

const collaboratorAccessMutations = `
  createCollaboratorAccess(input: CreateCollaboratorAccessInput!): CollaboratorAccess!
`;

export { collaboratorAccessTypes, collaboratorAccessQueries, collaboratorAccessMutations };
