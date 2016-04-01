'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  resolvers = require('../resolvers').play;


module.exports = (refs) => ({
  type: refs.PlayConnection,
  args: relay.connectionArgs,
  resolve: (parent, args, root) => {
    return relay.connectionFromPromisedArray(
      resolvers.getPlaysResolver(args),
      args
    );
  }
});
