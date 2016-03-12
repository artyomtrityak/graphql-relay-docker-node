'use scrict';

var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');
var pg = require('pg');

// Import our data set from above
var data = require('./data.json');

// Define our user type, with two string fields; `id` and `name`
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

var configStr = "postgres://" +
  process.env.DB_ENV_POSTGRES_USER +
  ":" +
  process.env.DB_ENV_POSTGRES_PASSWORD +
  "@" +
  process.env.DB_PORT_5432_TCP_ADDR +
  "/" +
  process.env.DB_ENV_POSTGRES_DB;

console.log('Connecting to database.... ', configStr);

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(configStr, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1
  });
});


console.log('Server online!');

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(5000);
