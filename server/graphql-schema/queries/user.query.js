'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers').user;


module.exports = (refs) => ({
  type: refs.userType,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: (parent, params, root) => {
    return resolvers.getUserResolver(params);
  }
});
