const express = require('express')
require('express-async-errors')
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

// isProduction depends on environment key in config/index.js file
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

// morgan middleware logs information about requests and responses
app.use(morgan('dev'));
// cookieParser middleware: parses cookies
app.use(cookieParser());
// express.json() middleware: parses JSON bodies of requests with application/json Content-Type
app.use(express.json());

if (!isProduction) {
    // security middleware: enable cors only in development
    app.use(cors());
}
app.use(
    // security middleware: helmet sets a variety of headers
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

app.use(routes);

// Error handling:
app.use((_req, _res, next) => {
    // catch unhandled requests and forward to error handler.
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
app.use((err, _req, res, _next) => {
    // error formatter
    res.status(err.status || 500);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });
module.exports = app;