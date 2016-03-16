'use strict';

let pg = require('pg'),
    Promise = require('bluebird');

let knex = require('knex')({
  debug: true,
  client: 'pg',
  connection: {
    host     : process.env.DB_PORT_5432_TCP_ADDR,
    user     : process.env.DB_ENV_POSTGRES_USER,
    password : process.env.DB_ENV_POSTGRES_PASSWORD,
    database : process.env.DB_ENV_POSTGRES_DB
  }
});

function testConnection2 () {
  knex.schema.dropTable('users')
  .then(function() {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.text('bio');
    });
  });
}
module.exports.testConnection2 = testConnection2;

//
// console.log(process.env.DB_PORT_5432_TCP_ADDR)
//
// setTimeout(() => {
//   console.log('knok')
//   knex.raw('SELECT 1 AS number', function () {
//     console.log('RESSSSS22');
//   });
// }, 5000);
//knex.schema.dropTableIfExists('users');
//

// knex.raw('select version();', function () {
//   console.log('RESSSSS');
// });

//knex.schema.createTable('users')
//.then((table) => {
//  console.log('create!!', table);
//});




//knex.raw('SELECT 1 AS number').then((t1, t2) => {console.log('lololo', t1, t2)});

//knex('users').select('id');
//
// knex.schema.createTable('users2', function (table) {
//   table.increments();
//   table.string('name');
//   table.timestamps();
//
//   console.log('OKOK', table);
// });

//
// Promise.promisifyAll(pg, {
//    filter: function(methodName) {
//        return methodName === "connect"
//    },
//    multiArgs: true
// });
// Promise.promisifyAll(pg);


let postgresConnectConfig = {
  user: process.env.DB_ENV_POSTGRES_USER,
  database: process.env.DB_ENV_POSTGRES_DB,
  password: process.env.DB_ENV_POSTGRES_PASSWORD,
  port: 5432,
  host: process.env.DB_PORT_5432_TCP_ADDR
};


/**
 * Gets one of the connections from PostgreSQL pool and returns for use
 * @return {Promise} pg connection for Promise.using
 */
function getConnectionFromPool () {
  let releaseToPool;
  return pg.connectAsync(postgresConnectConfig)
  .spread((client, done) => {
    releaseToPool = done;
    return client;
  })
  .disposer(() => {
    if (releaseToPool) {
      releaseToPool();
    }
  });
}
module.exports.getConnectionFromPool = getConnectionFromPool;


/**
 * Gets one of the connections from PostgreSQL pool, creates transaction and returns for use
 * @return {Promise} pg connection for Promise.using
 */
function getTransactionConnectFromPool () {
  let releaseToPool;
  return pg.connectAsync(postgresConnectConfig)
  .spread((client, done) => {
    releaseToPool = done;
    return client.queryAsync('BEGIN').then(() => client);
  })
  .disposer((client, promise) => {
    function closeClient() {
      if (releaseToPool) {
        releaseToPool();
      }
    }
    if (promise.isFulfilled()) {
      return client.queryAsync('COMMIT').then(closeClient);
    } else {
      return client.queryAsync('ROLLBACK').then(closeClient);
    }
  });
}
module.exports.transactionCon = getTransactionConnectFromPool;


/**
 * Sends base SQL query which shows that db connection works
 */
function testConnection () {
  console.log('Connecting to database....');
  Promise.using(getConnectionFromPool(), function (client) {
    //return client.queryAsync('SELECT $1::int AS number', ['1']);
    return client.queryAsync('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
  })
  .then((result) => {
    console.log('Connected to database successfully. ', result);
  });
}
module.exports.testConnection = testConnection;
