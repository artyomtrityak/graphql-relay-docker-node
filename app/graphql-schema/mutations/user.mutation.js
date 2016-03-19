'use strict';

const graphql = require('graphql'),
  userType = require('../types').user;


/**
 * GraphQL Mutation create user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function createUserResolver(root, params) {
  return root.app.get('model_user').createUser(params);
}


module.exports.createUser = {
  type: userType,
  args: {
    email: {
      type: graphql.GraphQLString
    },
    password: {
      type: graphql.GraphQLString
    }
  },
  resolve: createUserResolver
};
