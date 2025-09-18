exports.up = function (knex) {
    return knex.schema.createTable('observation_validations', table => {
        table.increments('validation_id').primary();
        table.integer('observation_id').unsigned().references('observation_id').inTable('observations').onDelete('CASCADE');
        table.integer('admin_id').unsigned().references('user_id').inTable('users');
        table.integer('corrected_species_id').unsigned().references('species_id').inTable('plant_species');
        table.text('notes');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('observation_validations');
};
