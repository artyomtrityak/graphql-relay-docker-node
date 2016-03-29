'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers');


module.exports = (refs) => {
  return new graphql.GraphQLObjectType({
    name: 'Play',
    interfaces: [refs.nodeInterface],

    fields: () => ({
      id: relay.globalIdField('Play'),

      name: {
        type: graphql.GraphQLString
      },

      author: {
        type: refs.userType,
        resolve: () => {
          return {id: 1111, name: 'user name'};
        }
      }
    })
  });
};
