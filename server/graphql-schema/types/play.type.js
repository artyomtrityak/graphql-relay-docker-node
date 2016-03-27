'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay');


module.exports = (nodeInterface) => {
  const playType = new graphql.GraphQLObjectType({
    name: 'Play',
    description: 'The play type.',
    interfaces: [nodeInterface],

    fields: () => ({
      id: relay.globalIdField('Play'),

      name: {
        type: graphql.GraphQLString,
        description: 'The play name'
      }
    })
  });

  return playType;
};
