'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),
  userType = require('../types').user;


/**
 * GraphQL Mutation create user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function createUserResolver(root, params) {
  return global.app.get('model__user').createUser(params);
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
