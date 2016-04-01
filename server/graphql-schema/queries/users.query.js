'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers');


module.exports = (refs) => ({
  type: refs.UserConnection,
  args: relay.connectionArgs,
  /*{
    //page: { type: graphql.GraphQLInt }
  },*/
  resolve: (parent, args, root) => {
    return relay.connectionFromPromisedArray(
      resolvers.getUsersResolver(args),
      args
    );
  }
});
