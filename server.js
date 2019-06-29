// Created: June 28th 2019
// Author: Tania Mathern
// Last edit: June 28th 2019

const express = require('express'),
    cors = require('cors'),
    helmet = require('helmet'),
    hpp = require('hpp'),
    slowDown = require('express-slow-down'),
    toobusy = require('node-toobusy'),
    winston = require('winston');

const routes = require('./routes');

const isRelease = process.env.NODE_ENV === 'dev';

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

if(!isRelease){ // add debug/tracing tools
    app.use(require('morgan')('dev'));
} else {
    app.use(require('morgan')('common'));
}
// middlewares (end) --------------------------------------------------------

// Logging into files -------------------------------------------------------
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});
// Logging into files (end) -------------------------------------------------

// Use routes
app.use('/', routes);

// Handle shutdown signals
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

// fallback to default server settings if port is not defined
const server = app.listen( process.env.PORT || 8080, function(){
    console.log('Listening on port ' + server.address().port);
});

// graceful shutdown
/*
    Gracefully shutdowns the server on SIGTERM or SIGINT kill signals.
    Tries to properly close server/connections before shutting the server down.
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

module.exports = server;