exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', table => {
      table.specificType('palette', 'TEXT[]');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', table => {
      table.dropColumn('palette');
    })
  ]);
};
