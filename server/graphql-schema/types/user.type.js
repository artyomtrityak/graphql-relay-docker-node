'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay');


module.exports = (refs) => {
  return new graphql.GraphQLObjectType({
    name: 'User',
    interfaces: [refs.nodeInterface],

    fields: () => ({
      id: relay.globalIdField('User'),

      email: {
        type: graphql.GraphQLString
      },

      verified: {
        type: graphql.GraphQLBoolean
      },

      details: {
        type: graphql.GraphQLString //TODO: use GraphQLObjectType http://graphql.org/docs/api-reference-type-system/
      },

      plays: {
        type: refs.PlayConnection,
        args: relay.connectionArgs,
        resolve: (user, args, root) => {
          const resultArgs = Object.assign({}, args, {authorId: user.id});
          return relay.connectionFromPromisedArray(
            global.app.get('model__play').getPlays(resultArgs),
            args
          );
        }
      }
    })
  });
};
