import {makeExecutableSchema} from 'graphql-tools'
import {Mutation} from './mutation'
import {Query} from './query'
import {commentType} from "./resources/comment/comment.schema";
import {postTypes} from "./resources/post/post.schema";
import {userTypes} from "./resources/user/user.schema";

const SchemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Mutation,
    Query,
    commentType,
    postTypes,
    userTypes
  ]
})