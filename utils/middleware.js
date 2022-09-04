const logger = require('./logger');

// to log every request
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

// replaces express default response
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// custom errorHandler implementation
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    // Wrong MongoDB id type (findById)
    return response.status(400).send({ error: 'malformatted id' });
    // MongoDB validationerror
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
    // jwt.sign fails
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
