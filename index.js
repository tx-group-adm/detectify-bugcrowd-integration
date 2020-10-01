const serverless = require('serverless-http');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const server = express().disable('x-powered-by');
require('dotenv').config();
const registerRoutes = require('./routes');

server.use(helmet());
server.use(bodyParser.json());

const port = 3000;

registerRoutes(server);

server.listen(port, (err) => {
  if (err) {
    console.error('something bad happened', err);
  } else {
    console.info('> Server is running ');
  }
});

// export the wrapped handler for the Lambda runtime
module.exports.handler = serverless(server);
