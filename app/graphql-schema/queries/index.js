'use strict';

let graphql = require('graphql'),
  TypesSchema = require('../types');


// Import our data set from above
var data = require('../../data.json');

// Define our user type, with two string fields; `id` and `name`
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

let QuerySchema = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function(_, args) {
        return data[args.id];
      }
    },

    user_db: {
      type: TypesSchema.user,
      resolve: (root, params) => {
        console.log('resolve!!', root, params);
        return {id: '123', email: 'art.trityak@gmail.com'};
      },
    }
  }
});
module.exports = QuerySchema;
