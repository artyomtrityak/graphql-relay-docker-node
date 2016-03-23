'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),

  types = require('./types'),
  rootQuery = require('./queries'),
  rootMutation = require('./mutations'),
  getUserResolver = require('./queries/user.query').getUserResolver;


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
      return types.user;
    }
  }
);

//Lazy define graphql types with interface
types(nodeDefs.nodeInterface);

const Schema = new graphql.GraphQLSchema({
  query: rootQuery(nodeDefs.nodeField),
  mutation: rootMutation()
});
module.exports = Schema;
