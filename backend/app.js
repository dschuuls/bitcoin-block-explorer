var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');

var app = express();

var blocksRouter = require('./routes/blocks');
var swaggerSpec = require('./lib/swagger');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API endpoints:
app.use('/blocks', blocksRouter);

// Swagger UI:
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// no luck with this:
// require('./lib/websocket');

module.exports = app;
