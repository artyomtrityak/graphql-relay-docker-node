'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  types = require('../types');


/**
 * GrapQL Query for single user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUserResolver(parent, params, root) {
  return global.app.get('model__user').getUser({id: params.id});
}
module.exports.getUserResolver = getUserResolver;


/**
 * GrapQL Query for list of users
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUsersResolver(parent, params, root) {
  return global.app.get('model__user').getUsers({page: params.page});
}
module.exports.getUsersResolver = getUserResolver;


module.exports.user = () => ({
  type: types.user,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: getUserResolver
});


module.exports.users = () => ({
  type: new graphql.GraphQLList(types.user),
  args: {
    page: { type: graphql.GraphQLInt }
  },
  resolve: getUsersResolver
});
