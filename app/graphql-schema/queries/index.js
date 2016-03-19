'use strict';

let graphql = require('graphql'),
  userQuery = require('./user.query');


const viewerType = new graphql.GraphQLObjectType({
  name: 'RootViewerType',
  description: 'Root Viewer type',

  fields: () => ({
    user: userQuery.user,
    users: userQuery.users
  })
});


const QuerySchema = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    root: {
      type: viewerType,
      resolve: () => {
        return {server: '1'};
      }
    }
  }
});


module.exports = QuerySchema;
