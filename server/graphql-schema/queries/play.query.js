'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay');


module.exports = (refs) => ({
  type: refs.playType,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: (parent, params, root) => {
    return global.app.get('model__play').getUser(params);
  }
});
