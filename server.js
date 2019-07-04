"use strict";

const express = require('express'),
    cors = require('cors'),
    helmet = require('helmet'),
    hpp = require('hpp'),
    slowDown = require('express-slow-down'),
    toobusy = require('node-toobusy'),
    morgan = require('morgan'),
    winston = require('./monitoring/logging.js');

const Config = require('./config.js'), 
        routes = require('./routes');

const cleanShutdownLimit = 10000;

Config.configureEnvironment();

const app = express();
Config.configureMiddlewares(app);

app.use('/', routes);

/**
 * Server 
 * The server fall  back to default server settings if port is not defined
*/
const server = app.listen( process.env.PORT || 8080, function(){
    console.log('Romannumeral server listening on port ' + server.address().port);
});

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
    }, cleanShutdownLimit); 
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

module.exports = server;