'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers');


module.exports = (refs) => ({
  type: refs.playType,
  args: {
    author: {
      type: graphql.GraphQLInt
    },
    name: {
      type: graphql.GraphQLString
    }
  },
  resolve: (parent, params, root) => {
    return resolvers.createPlayResolver(params);
  }
});
