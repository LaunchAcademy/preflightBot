
exports.up = function(knex, Promise) {
  return knex.schema.createTable('assignments', function (table) {
    table.increments()
    table.string('slug').notNullable()
    table.timestamps()
    table.unique('slug')
  }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('assignments')
};
