'use strict';

let knexFactory = require('knex'),
    PlayModel = require('./play.model'),
    UserModel = require('./user.model');


function connect (app) {
  const knex = knexFactory({
    debug: true,
    client: 'pg',
    connection: {
      host     : process.env.DB_PORT_5432_TCP_ADDR,
      user     : process.env.DB_ENV_POSTGRES_USER,
      password : process.env.DB_ENV_POSTGRES_PASSWORD,
      database : process.env.DB_ENV_POSTGRES_DB
    }
  });

  UserModel(app, knex);
}
module.exports.connect = connect;
