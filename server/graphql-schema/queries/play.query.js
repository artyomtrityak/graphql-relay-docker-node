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


module.exports.play = () => ({
  type: types.play,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: getPlayResolver
});


module.exports.plays = () => ({
  type: new graphql.GraphQLList(types.play),
  args: {
    page: { type: graphql.GraphQLInt }
  },
  resolve: getPlaysResolver
});
