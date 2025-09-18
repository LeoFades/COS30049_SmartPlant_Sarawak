exports.up = function (knex) {
    return knex.schema.createTable('sensors', table => {
        table.increments('sensor_id').primary();
        table.integer('species_id').unsigned().references('species_id').inTable('plant_species');
        table.string('location');
        table.string('sensor_type'); // temp, humidity, gps, etc.
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('sensors');
};
