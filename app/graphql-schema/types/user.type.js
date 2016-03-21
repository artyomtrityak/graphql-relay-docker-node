'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay');


const userType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'The user type.',
  interfaces: [global.app.get('graphql__nodeInterface')],

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
    }
  })
});
module.exports = userType;
