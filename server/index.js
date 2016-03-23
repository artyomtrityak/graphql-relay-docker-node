'use strict';

let graphql = require('graphql'),
  graphqlHTTP = require('express-graphql'),
  express = require('express'),
  session = require('express-session');


global.app = express();

const db = require('./data-layer'),
  graphqlSchema = require('./graphql-schema');

global.app.use(session({
  secret: 'keyboard cat', //TODO: get from process.env.
  //store: TODO: use some store to store sessions. Redis?
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));

db.connect();

console.log('Server is up!');

//TODO: only for development mode, check process.env.NODE_ENV development and hide all errors for production
let formatError = (error) => ({
  message: error.message,
  locations: error.locations,
  stack: error.stack
});

global.app
  .use('/graphql', graphqlHTTP((request) => ({
    schema: graphqlSchema,
    pretty: true,
    rootValue: {
      session: request.session
    },
    formatError: formatError
  })))
  .listen(5000);
