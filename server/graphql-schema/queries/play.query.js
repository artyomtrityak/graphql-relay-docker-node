'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers').play;


module.exports = (refs) => ({
  type: refs.playType,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: (parent, params, root) => {
    return resolvers.getPlayResolver(params);
  }
});
