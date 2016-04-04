'use strict';

let db,
  PublicAPI = {};


/**
 * Initialize Play Model table
 * @param  {object} _express Instance of express app
 * @param  {object} _db      Instance of knex db connection
 */
module.exports = function initialize(_db) {
  db = _db;

  //TODO: remove drop table when mock setup will be done
  //db.schema.dropTableIfExists('plays')
  //.then(function() {
  db.schema.createTableIfNotExists('plays', function(t) {
    t.increments('id').primary();
    t.string('__type', 16).defaultTo('Play');
    t.string('name', 127);
    t.text('description');
    t.integer('author').unsigned().notNullable().references('id').inTable('users');
    t.integer('bgg_game_id');
    t.integer('players_limit');
    t.dateTime('starts_at');
    t.string('address', 127);
    t.json('details');
  });
  //.then(() => {});
  //});

  global.app.set('model__play', PublicAPI);
};


/**
 * Get lists of plays
 * @param  {object} options {pageNum: Integer, pageSize: Integer}
 * @return {Promise} Select query promise
 */
PublicAPI.getPlays = (options) => {
  options = Object.assign({}, options);

  console.log(options);

  return db.select(
    'id', 'name', 'description', 'author', 'bgg_game_id', 'players_limit', 'starts_at', 'address', 'details', '__type'
  )
  .table('plays')
  .where(function() {
    if (options.authorId) {
      this.where('author', options.authorId);
    }
  })
  .offset(0)
  .limit(options.first);
};


/**
 * Get one play
 * @param  {object} options {id: Integer}
 * @return {Promise} Select query promise
 */
PublicAPI.getPlay = (options) => {
  return db.select(
    'id', 'name', 'description', 'author', 'bgg_game_id', 'players_limit', 'starts_at', 'address', 'details', '__type'
  )
    .table('plays')
    .where('id', options.id)
    .then((plays) => {
      return plays[0];
    });
};


/**
 * Create new play
 * @param  {object} options {email: String}
 * @return {Promise} Select created play query promise
 */
PublicAPI.createPlay = (options) => {
  console.log('creating play...', options);

  return db
    .into('plays')
    .returning('id')
    .insert({
      name: options.name,
      author: options.author
    })
    .then((params) => {
      return PublicAPI.getPlay({id: params[0]});
    });
};
