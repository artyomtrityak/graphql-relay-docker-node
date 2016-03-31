'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),
  types = require('./types'),
  queries = require('./queries'),
  mutations = require('./mutations'),
  resolvers = require('./resolvers');


const nodeDefs = relay.nodeDefinitions(
  (globalId) => {
    const obj = relay.fromGlobalId(globalId);
    switch (obj.__type) {
      case 'User':
        return resolvers.getUserResolver({}, {id: obj.id}, {});
      case 'Play':
        return resolvers.getPlayResolver({}, {id: obj.id}, {});
    }
    return null;
  },
  (obj) => {
    switch (obj.__type) {
      case 'User':
        return refs.userType;
      case 'Play':
        return refs.playType;
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
