'use strict';

/**
 * GrapQL Query for single user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUserResolver(params) {
  return global.app.get('model__user').getUser({id: params.id});
}
module.exports.getUserResolver = getUserResolver;


/**
 * GrapQL Query for list of users
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getUsersResolver(params) {
  return global.app.get('model__user').getUsers(params);
}
module.exports.getUsersResolver = getUsersResolver;


/**
 * GraphQL Mutation create user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function createUserResolver(params) {
  return global.app.get('model__user').createUser(params);
}
module.exports.createUserResolver = createUserResolver;
