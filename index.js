const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

// not strictly neccesary but it can be useful if connecting a socket to the same port
const server = http.createServer(app);
// the other way would be just app.listen

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
