'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers').play;


module.exports = (refs) => {
  return new graphql.GraphQLObjectType({
    name: 'User',
    interfaces: [refs.nodeInterface],

    fields: () => ({
      id: relay.globalIdField('User'),

      email: {
        type: graphql.GraphQLString
      },

      verified: {
        type: graphql.GraphQLBoolean
      },

      details: {
        type: graphql.GraphQLString //TODO: use GraphQLObjectType http://graphql.org/docs/api-reference-type-system/
      },

      plays: {
        type: refs.PlayConnection,
        resolve: () => {
          return [{id: 1, name: 'play 1'}, {id: 2, name: 'play 2'}];
        }
      }
    })
  });
};
