"use strict"; 

const cors = require('cors'),
    helmet = require('helmet'),
    hpp = require('hpp'),
    slowDown = require('express-slow-down'),
    toobusy = require('node-toobusy'),
    morgan = require('morgan'),
    winston = require('./monitoring/logging.js');

const dotenv = require('dotenv');

/**
 * Class to configure the server
 */
class Config {
    /** 
     * Default constructor
     */
    constructor(){
    }

    /** 
     * Set environment variables using the .env file.
     * Does not override previously set ENV variable (values set from outside are considered more important).
     */
    static configureEnvironment(){
        dotenv.config({ path: './settings.env' }); 
    }

    /**
     * Configure middlewares used by the server:
     * CORS, HPP, Helmet, speedLimiter, toobusy, loggers (morgan and winston)
     * @param {object} expressApp, express application which needs middleware configuration
     */
    static configureMiddlewares(expressApp){
        expressApp.use(cors()); // in case there are (legitimate) requests coming from another domain
        expressApp.use(hpp()); // avoid parameter pollution (last value wins)
        expressApp.use(helmet()); // for header security

        // rate limiter
        const speedLimiter = slowDown({
            windowMs: 5 * 60 * 1000, // window for max requests per IP
            delayAfter: 1000, // allow delayAfter requests per windowMs minutes, then...
            delayMs: 250, // begin adding 500ms of delay per request above 100
            maxDelayMs: 3000 // max delay
        });  
        expressApp.use(speedLimiter);

        // return 503 if the server is too busy
        expressApp.use(function(req, res, next) {
            if (toobusy()) {
                res.send(503, 'Server busy. Try again later.');
            } else {
                next();
            }
        });

        expressApp.use(morgan('combined', { stream: winston.stream })); // for log files
        expressApp.use(morgan('common')); // for console
    }
}

module.exports = Config;