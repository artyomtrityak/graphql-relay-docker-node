'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),
  types = require('./types'),
  queries = require('./queries'),
  mutations = require('./mutations'),
  getUserResolver = require('./resolvers').getUserResolver;


const nodeDefs = relay.nodeDefinitions(
  (globalId) => {
    const obj = relay.fromGlobalId(globalId);
    if (obj.type === 'User') {
      return getUserResolver({}, {id: obj.id}, {});
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj.__type === 'User') {
      return refs.userType;
    }
    return null;
  }
);


// Create refs for GraphQL schema lazy creation
let refs = {nodeInterface: nodeDefs.nodeInterface, nodeField: nodeDefs.nodeField};
[types, queries, mutations].forEach((schema) => {
  Object.keys(schema).forEach((key) => {
    refs[key] = schema[key](refs);
  });
});


const Schema = new graphql.GraphQLSchema({
  query: refs.rootQuery,
  mutation: refs.rootMutation
});
module.exports = Schema;
