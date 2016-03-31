'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers');


module.exports = (refs) => ({
  type: refs.userType,
  args: {
    email: {
      type: graphql.GraphQLString
    },
    password: {
      type: graphql.GraphQLString
    }
  },
  resolve: (parent, params, root) => {
    return resolvers.createUserResolver(params);
  }
});
