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
        let activateRateLimiter = process.env.ACTIVE_RATE_LIMITER || true;

        expressApp.use(cors()); // in case there are (legitimate) requests coming from another domain
        expressApp.use(hpp()); // avoid parameter pollution (last value wins)
        expressApp.use(helmet()); // for header security

        // rate limiter
        if(activateRateLimiter){
            let windowMs = process.env.RATELIMIT_WINDOW_MS            || (5 * 60 * 1000);
            let delayAfter = process.env.RATELIMIT_DELAYAFTER_MS      || 1000;
            let delayMs = process.env.RATELIMIT_DELAY_MS              || 250;
            let maxDelayMs = process.env.RATELIMIT_MAXDELAY_MS        || 3000;
            const speedLimiter = slowDown({
                windowMs: windowMs, // window for max requests per IP
                delayAfter: delayAfter, // allow delayAfter requests per windowMs minutes, then...
                delayMs: delayMs, // begin adding 500ms of delay per request above 100
                maxDelayMs: maxDelayMs // max delay
            });  
            expressApp.use(speedLimiter);
        }

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