'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),
  userType = require('../types').user;

/**
 * GrapQL Query for single user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUserResolver(parent, params, root) {
  return global.app.get('model__user').getUser({id: params.id});
}


/**
 * GrapQL Query for list of users
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUsersResolver(parent, params, root) {
  return global.app.get('model__user').getUsers({page: params.page});
}


module.exports.user = {
  type: userType,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: getUserResolver
};


module.exports.users = {
  type: new graphql.GraphQLList(userType),
  args: {
    page: { type: graphql.GraphQLInt }
  },
  resolve: getUsersResolver
};
