'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),

  userMutation = require('./user.mutation');


module.exports.rootMutation = (refs) => {
  return new graphql.GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      createUser: userMutation(refs)
    }
  });
};
