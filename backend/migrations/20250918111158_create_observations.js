exports.up = function (knex) {
    return knex.schema.createTable('observations', table => {
        table.increments('observation_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users');
        table.integer('species_id').unsigned().references('species_id').inTable('plant_species').nullable();
        table.string('photo_url').notNullable();
        table.float('latitude');
        table.float('longitude');
        table.decimal('ai_confidence', 5, 2); // 0.00 - 100.00 %
        table.boolean('flagged').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('observations');
};
