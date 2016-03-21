'use strict';

let db,
  PublicAPI = {};


/**
 * Initialize User Model table
 * @param  {object} _express Instance of express app
 * @param  {object} _db      Instance of knex db connection
 */
module.exports = function initialize(_db) {
  db = _db;

  //TODO: remove drop table when mock setup will be done
  //db.schema.dropTable('users')
  //.then(function() {
  db.schema.createTableIfNotExists('users', function(t) {
    //TODO: test uuid
    t.uuid('id').primary();
    t.string('email', 100);
    t.string('pass_salt', 32);
    t.string('password_salted', 32);
    t.boolean('verified').defaultTo(false);
    t.json('details');
  });
  //});

  global.app.set('model__user', PublicAPI);
};


/**
 * Get lists of users
 * @param  {object} options {pageNum: Integer, pageSize: Integer}
 * @return {Promise} Select query promise
 */
PublicAPI.getUsers = (options) => {
  options = Object.assign({}, options, {page: 1, pageSize: 50});

  return db.select('id', 'email', 'verified', 'details')
    .table('users')
    .offset((options.page - 1) * options.pageSize)
    .limit(options.pageSize);
};


/**
 * Get one user
 * @param  {object} options {id: Integer}
 * @return {Promise} Select query promise
 */
PublicAPI.getUser = (options) => {
  return db.select('id', 'email', 'verified', 'details')
    .table('users')
    .where('id', options.id)
    .then((users) => {
      console.log('res:', users);
      return users[0];
    });
};


/**
 * Create new user
 * @param  {object} options {email: String}
 * @return {Promise} Select created user query promise
 */
PublicAPI.createUser = (options) => {
  return db
    .into('users')
    .returning('id')
    .insert({email: options.email})
    .then((params) => {
      return PublicAPI.getUser({id: params[0]});
    });
};
