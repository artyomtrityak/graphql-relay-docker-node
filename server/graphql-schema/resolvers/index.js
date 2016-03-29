'use strict';

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
module.exports.getUsersResolver = getUsersResolver;


/**
 * GrapQL Query for single user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getPlayResolver(parent, params, root) {
  return {id: 2, name: 'play 2'};
  //return global.app.get('model__user').getUser({id: params.id});
}
module.exports.getPlayResolver = getPlayResolver;


/**
 * GrapQL Query for list of users
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getPlaysResolver(parent, params, root) {
  return [{id: 1, name: 'play 1'}, {id: 2, name: 'play 2'}];
  //return global.app.get('model__user').getUsers({page: params.page});
}
module.exports.getPlaysResolver = getPlaysResolver;


/**
 * GraphQL Mutation create user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function createUserResolver(parent, params, root) {
  return global.app.get('model__user').createUser(params);
}
module.exports.createUserResolver = createUserResolver;