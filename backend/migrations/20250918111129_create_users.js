// migrations/20250914_create_users.js
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('user_id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password_hash').notNullable();
        table.enum('role', ['public', 'admin']).defaultTo('public');
        table.timestamps(true, true); // created_at, updated_at
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
