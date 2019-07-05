"use strict";

const express = require('express'),
        Config = require('./config.js'), 
        routes = require('./routes');

Config.configureEnvironment();
const cleanShutdownLimit = process.env.SHUTDOWNLIMIT_MS || 10000;
const port = process.env.PORT || 8080;

const app = express();
Config.configureMiddlewares(app);

app.use('/', routes);

/**
 * Server 
 * The server fall back to default server settings if port (8080) or shutdown limit (10000ms) are not defined
*/
const server = app.listen(port, function(){
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