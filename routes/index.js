"use strict";

const routes = require('express').Router();

// roman numerals
const romannumerals = require('./romannumeralRoutes.js');
routes.use('/', romannumerals);

// server health and monitoring
const monitoring = require('./serverMonitoringRoutes.js');
routes.use('/', monitoring);

/** 
  * Returns status code 404 and message "URL not found"
  * for any URL/route not found on this server
  * @returns {string} message 'URL not found' and status 404 if url is not found on this server
*/
routes.get('*', function(req, res, next) {
    res.status(404).json({ message: 'URL not found', status: 404 });
});

module.exports = routes;