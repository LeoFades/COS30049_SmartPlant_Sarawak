const knex = require('../db/knex');
const bcrypt = require('bcrypt');

class User {
    static async create({ name, email, password }) {
        const hashed = await bcrypt.hash(password, 10);
        return knex('users')
            .insert({ name, email, password: hashed })
            .returning(['user_id', 'name', 'email']);
    }

    static async findByEmail(email) {
        return knex('users').where({ email }).first();
    }
}

module.exports = User;
