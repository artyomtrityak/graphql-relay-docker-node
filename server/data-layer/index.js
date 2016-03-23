'use strict';

const knexFactory = require('knex'),
  UserModel = require('./user.model');


/**
 * Connect to database and initialize all database models
 * @param  {object} app Instance of express app
 */
module.exports.connect = function connect() {
  const db = knexFactory({
    debug: true, //TODO: use process.env.NODE_ENV development
    client: 'pg',
    connection: {
      host     : process.env.DB_PORT_5432_TCP_ADDR,
      user     : process.env.DB_ENV_POSTGRES_USER,
      password : process.env.DB_ENV_POSTGRES_PASSWORD,
      database : process.env.DB_ENV_POSTGRES_DB
    }
  });

  UserModel(db);
};
