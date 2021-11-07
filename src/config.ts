const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

module.exports = {
  DB: process.env.DB,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
};
