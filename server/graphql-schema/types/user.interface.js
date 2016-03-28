'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),
  types = require('../types');

module.exports = () => {
  const userInterface = new graphql.GraphQLInterfaceType({
    name: 'UserInterface',
    description: 'The user interface.',

    fields: () => ({
      email: {
        type: graphql.GraphQLString,
        description: 'The user email.'
      },

      verified: {
        type: graphql.GraphQLBoolean,
        description: 'User email verification state'
      },

      details: {
        type: graphql.GraphQLString, //TODO: use GraphQLObjectType http://graphql.org/docs/api-reference-type-system/
        description: 'User details object'
      }
    }),
    resolveType: () => {
      return types.user;
    }
  });

  return userInterface;
};
