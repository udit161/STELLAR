import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

/**
 * PostgreSQL Connection Pool Configuration
 * Supports connection via DATABASE_URL or individual PG* environment variables.
 */
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' || process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    }
  : {
      user: process.env.PGUSER || 'postgres',
      host: process.env.PGHOST || 'localhost',
      database: process.env.PGDATABASE || 'satquery_db',
      password: process.env.PGPASSWORD || 'postgres',
      port: parseInt(process.env.PGPORT || '5432', 10),
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

/**
 * Execute a query against the PostgreSQL database
 * @param {string} text - SQL query string
 * @param {Array} params - Parameterized query values
 * @returns {Promise<pkg.QueryResult>}
 */
export const query = (text, params) => pool.query(text, params);

/**
 * Test PostgreSQL database connection
 * @returns {Promise<boolean>}
 */
export const testDbConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW() as current_time');
    console.log('✅ PostgreSQL Database connected successfully at:', res.rows[0].current_time);
    return true;
  } catch (error) {
    console.warn('⚠️ PostgreSQL Connection Warning:', error.message);
    console.warn('   Ensure PostgreSQL is running and credentials in .env are correct.');
    return false;
  }
};

export default pool;
