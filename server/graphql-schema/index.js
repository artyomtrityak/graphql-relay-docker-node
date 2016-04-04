'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),
  types = require('./types'),
  queries = require('./queries'),
  mutations = require('./mutations');


const nodeDefs = relay.nodeDefinitions(
  (globalId) => {
    const obj = relay.fromGlobalId(globalId);
    switch (obj.type) {
      case 'User':
        return global.app.get('model__user').getUser({id: obj.id});
      case 'Play':
        return global.app.get('model__play').getPlay({id: obj.id});
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
    const refConnection = relay.connectionDefinitions({
      name: refs[key].name,
      nodeType: refs[key]
    });

    refs[refs[key].name + 'Connection'] = refConnection.connectionType;
    refs[refs[key].name + 'Edge'] = refConnection.edgeType;
  });
});


const Schema = new graphql.GraphQLSchema({
  query: refs.rootQuery,
  mutation: refs.rootMutation
});
module.exports = Schema;
