const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// eliminates the need to define try/catch blocks and calling next(error), implements it under the hood
require('express-async-errors');

const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

// This is CORS-enabled for all origins
app.use(cors());
// to serve static assets, in this case the react build
app.use(express.static('build'));
// to parse json body requests
app.use(express.json());
app.use(middleware.requestLogger);

/*
If the application has multiple interfaces requiring identification,
JWT's validation should be separated into its own middleware.
Some existing library like express-jwt could also be used.
*/

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
