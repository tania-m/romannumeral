"use strict";

const winston = require('winston');

// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: 'info',
        filename: `./logs/server.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: false,
    }
};

  // instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file)
    ]
});

  // create a stream object with a 'write' function that will be used by morgan
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;