'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers').user;


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
        resolve: (user) => {
          return resolvers.getUserResolver({id: user.id});
        }
      }
    })
  });
};
