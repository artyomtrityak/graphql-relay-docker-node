'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers');


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
        type: new graphql.GraphQLList(refs.playType),
        resolve: () => {
          return [{id: 123455, name: 'play 1'}, {id: 255566, name: 'play 2'}];
        }
      }
    })
  });
};
