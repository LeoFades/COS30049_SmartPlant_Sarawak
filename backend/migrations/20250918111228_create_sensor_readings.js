exports.up = function (knex) {
    return knex.schema.createTable('sensor_readings', table => {
        table.increments('reading_id').primary();
        table.integer('sensor_id').unsigned().references('sensor_id').inTable('sensors').onDelete('CASCADE');
        table.string('data_type'); // temp, humidity, etc.
        table.decimal('value', 10, 2);
        table.timestamp('recorded_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('sensor_readings');
};
