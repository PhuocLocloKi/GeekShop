const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'geekshop_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

// Test connection on startup
pool.getConnection()
  .then((conn) => {
    console.log('DATABASE_STATUS: CONNECTED // POOL_ACTIVE');
    conn.release();
  })
  .catch((err) => {
    console.error('DATABASE_CRITICAL_ERROR: Connection failed.');
    console.error('ACTION_REQUIRED: Please make sure MySQL service is active and running.');
    console.error('DETAILS:', err.message);
  });

module.exports = pool;
