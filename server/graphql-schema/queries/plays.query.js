'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay');


module.exports = (refs) => ({
  type: refs.PlayConnection,
  args: relay.connectionArgs,
  resolve: (parent, args, root) => {
    return relay.connectionFromPromisedArray(
      global.app.get('model__play').getPlays(args),
      args
    );
  }
});
