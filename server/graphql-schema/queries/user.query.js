'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers');


module.exports = (refs) => ({
  type: refs.userType,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: resolvers.getUserResolver
});
