'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers');


module.exports = (refs) => ({
  type: new graphql.GraphQLList(refs.userType),
  args: {
    page: { type: graphql.GraphQLInt }
  },
  resolve: (parent, params, root) => {
    return resolvers.getUsersResolver(params);
  }
});
