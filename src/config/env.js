require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_PATH: process.env.DB_PATH || './data',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'default_key',
};