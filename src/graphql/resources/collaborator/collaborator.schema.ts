const collaboratorTypes = `
  # Collaborator definition types
  type Collaborator {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateCollaboratorInput {
    name: String!
    email: String!
    password: String!
  }
`;

const collaboratorQueries = `
  collaborators: [Collaborator!]!
`;

const collaboratorMutations = `
  createCollaborator(input: CreateCollaboratorInput!): Collaborator!
`;

export { collaboratorTypes, collaboratorQueries, collaboratorMutations }
