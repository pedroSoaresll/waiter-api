"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentType = `
  type Comment {
    id: ID!
    comment: String!
    createAt: String!
    updatedAt: String!
    user: User!
    post: Post!
  }
  
  input CommentInput {
    comment: String!
    post: Int!
    user: Int!
  }
`;
exports.commentType = commentType;
const commentQueries = `
  commentsByPost(post: ID!, first: Int, offset: Int): [Comment!]!
`;
exports.commentQueries = commentQueries;
const commentMutation = `
  createComment(input: CommentInput): Comment
  updateComment(id: ID!, input: CommentInput): Comment
  deleteComment(id: ID!): Boolean
`;
exports.commentMutation = commentMutation;
