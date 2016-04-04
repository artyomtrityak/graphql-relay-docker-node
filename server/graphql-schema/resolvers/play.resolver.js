'use strict';

/**
 * GrapQL Query for single user
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getPlayResolver(params) {
  return global.app.get('model__play').getUser(params);
}
module.exports.getPlayResolver = getPlayResolver;


/**
 * GrapQL Query for list of users
 * @param  {Object} root
 * @param  {Object} params
 * @return {Promise}
 */
function getPlaysResolver(params) {
  return global.app.get('model__play').getPlays(params);
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
