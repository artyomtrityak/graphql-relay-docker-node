'use strict';

const graphql = require('graphql'),
  userMutation = require('./user.mutation');


module.exports = () => {
  const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      createUser: userMutation.createUser()
    }
  });
  return RootMutation;
};
