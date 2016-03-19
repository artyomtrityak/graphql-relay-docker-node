'use strict';

let graphql = require('graphql'),
  userType = require('../types').user;


/**
 * GrapQL Query for single user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUserResolver(parent, params, root) {
  return root.rootValue.app.get('model_user').getUser({id: params.id});
}


/**
 * GrapQL Query for list of users
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUsersResolver(parent, params, root) {
  return root.rootValue.app.get('model_user').getUsers({page: params.page});
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
