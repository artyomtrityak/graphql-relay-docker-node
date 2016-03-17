'use strict';

let express,
  db,
  PublicAPI = {};


/**
 * Initialize User Model table
 * @param  {object} _express Instance of express app
 * @param  {object} _db      Instance of knex db connection
 */
module.exports = function initialize(_express, _db) {
  express = _express;
  db = _db;

  db.schema.dropTable('users')
  .then(function() {
    return db.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('email', 100);
      t.string('pass_salt', 32);
      t.string('password_salted', 32);
      t.boolean('verified').defaultTo(false);
      t.json('details');
    });
  });
};


/**
 * Get lists of users
 * @param  {object} options {pageNum: Number, pageSize: Number}
 * @return {Promise} Select query promise
 */
PublicAPI.getUsers = (options) => {
  options = Object.assign({}, options, {pageNum: 1, pageSize: 50});

  return db.select('id', 'email', 'verified', 'details')
    .table('users')
    .limit(options.pageSize)
    .offset((options.pageNum - 1) * options.pageSize);
};
