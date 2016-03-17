'use strict';

let graphql = require('graphql'),
  graphqlHTTP = require('express-graphql'),
  express = require('express'),
  session = require('express-session'),

  db = require('./data-layer'),
  graphqlSchema = require('./graphql-schema');


let app = express();
app.use(session({
  secret: 'keyboard cat', //TODO: get from process.env.
  //store: TODO: use some store to store sessions. Redis?
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));
db.connect(app);

console.log('Server is up!');

//TODO: only for development mode, check process.env.NODE_ENV
let formatError = (error) => ({
  message: error.message,
  locations: error.locations,
  stack: error.stack
});

app
  .use('/graphql', graphqlHTTP((request) => ({
    schema: graphqlSchema,
    pretty: true,
    rootValue: {session: request.session},
    formatError: formatError
  })))
  .listen(5000);
