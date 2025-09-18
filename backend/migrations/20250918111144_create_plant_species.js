exports.up = function (knex) {
    return knex.schema.createTable('plant_species', table => {
        table.increments('species_id').primary();
        table.string('scientific_name').notNullable();
        table.string('common_name');
        table.string('conservation_status'); // e.g., endangered, rare
        table.text('description');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('plant_species');
};
