'use strict';

const graphql = require('graphql');

module.exports = () => {
  const userMutation = require('./user.mutation');


  const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      createUser: userMutation.createUser
    }
  });
  return RootMutation;
};
