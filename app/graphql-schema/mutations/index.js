'use strict';

const graphql = require('graphql'),
  userMutation = require('./user.mutation');


const MutationSchema = new graphql.GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: userMutation.createUser
  }
});
module.exports = MutationSchema;
