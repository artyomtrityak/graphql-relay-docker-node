'use strict';

/**
 * GrapQL Query for single user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getPlayResolver(params) {
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
function getPlaysResolver(params) {
  return [{id: 1, name: 'play 1'}, {id: 2, name: 'play 2'}];
  //return global.app.get('model__user').getUsers({page: params.page});
}
module.exports.getPlaysResolver = getPlaysResolver;

/**
 * GraphQL Mutation create play
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function createPlayResolver(params) {
  return global.app.get('model__play').createPlay(params);
}
module.exports.createPlayResolver = createPlayResolver;
