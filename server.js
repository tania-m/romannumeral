"use strict";

const express = require('express'),
    cors = require('cors'),
    helmet = require('helmet'),
    hpp = require('hpp'),
    slowDown = require('express-slow-down'),
    toobusy = require('node-toobusy'),
    morgan = require('morgan'),
    winston = require('./monitoring/logging.js');

const routes = require('./routes'),
    config = require('./config.js');

const app = express();

// middlewares -------------------------------------------------------------
app.use(cors()); // in case there are (legitimate) requests coming from another domain
app.use(hpp()); // avoid parameter pollution (last value wins)
app.use(helmet()); // for header security

// rate limiter
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // window for max requests per IP
    delayAfter: 500, // allow 100 requests per 15 minutes, then...
    delayMs: 250, // begin adding 500ms of delay per request above 100
    maxDelayMs: 3000 // max delay
});  
app.use(speedLimiter);

// return 503 if the server is too busy
app.use(function(req, res, next) {
    if (toobusy()) {
        res.send(503, 'Server busy. Try again later.');
    } else {
        next();
    }
});

app.use(morgan('combined', { stream: winston.stream })); // for log files
app.use(morgan('common')); // for console
// middlewares (end) --------------------------------------------------------

app.use('/', routes);

// graceful shutdown
/**
 *  Gracefully shuts down the server on SIGTERM or SIGINT kill signals.
*/
function shutDown() {
    console.log('Received kill signal (SIGINT || SIGTERM), shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });

    setTimeout(() => {c
        console.error('Could not close remaining connections in time, forcing server shutdown');
        process.exit(1);
    }, 10000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

// Server - fallback to default server settings if port is not defined
console.log(process.env.PORT)
const server = app.listen( process.env.PORT || 8080, function(){
    console.log('Listening on port ' + server.address().port);
});

module.exports = server;