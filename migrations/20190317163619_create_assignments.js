
exports.up = function(knex, Promise) {
  knex.schema.createTable('assignments', function (table) {
    table.increments()
    table.string('slug').notNullable()
    table.timestamps()
    table.unique('slug')
  }) 
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('assignments')
};
