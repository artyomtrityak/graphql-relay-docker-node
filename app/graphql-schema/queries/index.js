'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay');


module.exports = (nodeField) => {
  //This should be required in execution phase to be able register nodeInterface first
  const userQuery = require('./user.query');


  const viewerType = new graphql.GraphQLObjectType({
    name: 'RootViewerType',
    description: 'Root Viewer type',

    fields: () => ({
      user: userQuery.user,
      users: userQuery.users
    })
  });


  const rootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      viewer: {
        type: viewerType,
        resolve: () => {
          return {server: '1'};
        }
      },
      node: nodeField
    }
  });

  return rootQuery;
};
