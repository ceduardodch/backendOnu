const { Pool } = require('pg');

const pool = new Pool({
  user: 'carlos.diaz',
  host: 'localhost',
  database: 'onu',
  password: 'CarlosDiaz2013',
  port: 5432,
});

module.exports = pool;
