'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('./resolvers');


module.exports = (nodeInterface) => {
  const userType = new graphql.GraphQLObjectType({
    name: 'User',
    interfaces: [nodeInterface],

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
        type: new graphql.GraphQLList(playType),
        resolve: () => {
          return [{id: 1, name: 'play 1'}, {id: 2, name: 'play 2'}];
        }
      }
    })
  });


  const playType = new graphql.GraphQLObjectType({
    name: 'Play',
    interfaces: [nodeInterface],

    fields: () => ({
      id: relay.globalIdField('Play'),

      name: {
        type: graphql.GraphQLString
      },

      author: {
        type: userType,
        resolve: () => {
          return {id: 1, name: 'user name'};
        }
      }
    })
  });


  module.exports.play = () => ({
    type: playType,
    args: {
      id: { type: graphql.GraphQLInt }
    },
    resolve: resolvers.getPlayResolver
  });


  module.exports.user = () => ({
    type: userType,
    args: {
      id: { type: graphql.GraphQLInt }
    },
    resolve: resolvers.getUserResolver
  });


  module.exports.users = () => ({
    type: new graphql.GraphQLList(userType),
    args: {
      page: { type: graphql.GraphQLInt }
    },
    resolve: resolvers.getUsersResolver
  });


  module.exports.createUser = () => ({
    type: userType,
    args: {
      email: {
        type: graphql.GraphQLString
      },
      password: {
        type: graphql.GraphQLString
      }
    },
    resolve: resolvers.createUserResolver
  });
};
