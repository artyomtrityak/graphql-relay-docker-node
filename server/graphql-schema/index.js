'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),
  schema = require('./schema'),

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
      return types.user;
    }
    return null;
  }
);

//Initialize schema by magic nodeInterface
schema(nodeDefs.nodeInterface);


const viewerType = new graphql.GraphQLObjectType({
  name: 'RootViewerType',
  description: 'Root Viewer type',

  fields: () => ({
    user: schema.user(),
    users: schema.users(),
    play: schema.play()
    //plays: schema.plays()
  })
});


const rootQuery = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    viewer: {
      type: viewerType,
      resolve: () => {
        return {server: '1'};
      }
    },
    node: nodeDefs.nodeField
  }
});


const rootMutation = new graphql.GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: schema.createUser()
  }
});


const Schema = new graphql.GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
});
module.exports = Schema;
