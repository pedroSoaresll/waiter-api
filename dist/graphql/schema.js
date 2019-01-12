"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const mutation_1 = require("./mutation");
const query_1 = require("./query");
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const user_schema_1 = require("./resources/user/user.schema");
const SchemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        mutation_1.Mutation,
        query_1.Query,
        comment_schema_1.commentType,
        post_schema_1.postTypes,
        user_schema_1.userTypes
    ]
});
