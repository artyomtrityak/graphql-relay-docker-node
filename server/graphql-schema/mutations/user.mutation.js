'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay');


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
  resolve: (parent, args, root) => {
    return global.app.get('model__user').createUser(args);
  }
});
