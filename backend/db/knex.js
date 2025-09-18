// backend/db/knex.js
const knex = require('knex');
const knexConfig = require('../knexfile'); // if you have knexfile.js at backend root

const db = knex(knexConfig.development); // or process.env.NODE_ENV
module.exports = db;
