'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay');


module.exports = (refs) => ({
  type: refs.playType,
  args: {
    author: {
      type: graphql.GraphQLInt
    },
    name: {
      type: graphql.GraphQLString
    }
  },
  resolve: (parent, args, root) => {
    return global.app.get('model__play').createPlay(args);
  }
});
