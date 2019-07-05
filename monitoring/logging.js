"use strict";

const winston = require('winston');

/**
 * Define the custom settings for each transport (here only file)
 */
const options = {
    file: {
        level: 'info',
        filename: './logs/server.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: false
    }
};

/**
 * Instantiate a new winston logger with the settings defined above (for logging into files)
 */
let logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file)
    ]
});

/**
 * Create a stream object with a 'write' function that will be used by morgan to put logged data into files
 */
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;