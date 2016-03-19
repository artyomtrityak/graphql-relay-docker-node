'use strict';

let graphql = require('graphql'),
  QuerySchema = require('./queries'),
  MutationSchema = require('./mutations');


const Schema = new graphql.GraphQLSchema({
  query: QuerySchema,
  mutation: MutationSchema
});
module.exports = Schema;
