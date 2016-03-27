'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay');


module.exports = (nodeInterface) => {
  const userPlayType = new graphql.GraphQLObjectType({
    name: 'UserPlay',
    description: 'The play type.',
    interfaces: [nodeInterface],

    fields: () => ({
      id: relay.globalIdField('Play'),

      name: {
        type: graphql.GraphQLString,
        description: 'The play name'
      }
    })
  });

  const userType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'The user type.',
    interfaces: [nodeInterface],

    fields: () => ({
      id: relay.globalIdField('User'),

      email: {
        type: graphql.GraphQLString,
        description: 'The user id.'
      },

      verified: {
        type: graphql.GraphQLBoolean,
        description: 'User email verification state'
      },

      details: {
        type: graphql.GraphQLString, //TODO: use GraphQLObjectType http://graphql.org/docs/api-reference-type-system/
        description: 'User details object'
      },

      plays: {
        type: new graphql.GraphQLList(userPlayType),
        resolve: () => {
          return [{id: 1, name: 'play 1'}, {id: 2, name: 'play 2'}];
        }
      }
    })
  });

  return userType;
};
