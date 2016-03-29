'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),

  userQuery = require('./user.query'),
  usersQuery = require('./users.query'),
  playQuery = require('./play.query');


module.exports.rootQuery = (refs) => {
  const viewerType = new graphql.GraphQLObjectType({
    name: 'RootViewerType',

    fields: () => ({
      user: userQuery(refs),
      users: usersQuery(refs),
      play: playQuery(refs)
    })
  });


  return new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      viewer: {
        type: viewerType,
        resolve: () => {
          //Root server information: version etc
          return {
            server: '1'
          };
        }
      },
      node: refs.nodeField
    }
  });
};
