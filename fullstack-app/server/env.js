const { config } = require('dotenv');

// loads variables in .env file
config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URI,
};
