// to read .env variables, always has to be at the top so that the remainig code can access its values
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
