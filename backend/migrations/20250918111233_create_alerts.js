exports.up = function (knex) {
    return knex.schema.createTable('alerts', table => {
        table.increments('alert_id').primary();
        table.integer('sensor_id').unsigned().references('sensor_id').inTable('sensors');
        table.string('alert_type'); // poaching, abnormal temp, etc.
        table.text('message');
        table.boolean('resolved').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('alerts');
};
