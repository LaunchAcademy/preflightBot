
exports.up = function(knex, Promise) {
  return knex.schema.createTable('submissions', function (table) {
    table.increments()
    table.string('url').notNullable()
    table.integer('assignment_id').notNullable().references('assignments.id')
    table.integer('user_id').notNullable().references('users.id')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('submissions')
};
