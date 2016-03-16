'use strict';

let express,
    db;

module.exports = function initialize (_express, _db) {
  express = _express;
  db = _db;

  db.schema.dropTable('users')
  .then(function() {
    return db.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.text('bio');
    });
  });
}
