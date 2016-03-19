'use strict';

let graphql = require('graphql');


const userTypeSchema = new graphql.GraphQLObjectType({
  name: 'user',
  description: 'The user type.',

  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      description: 'The id of the user.'
    },

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
    }
  })
});
module.exports = userTypeSchema;
