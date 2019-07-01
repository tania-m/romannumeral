"use strict";

const routes = require('express').Router();

const apiVersion = process.env.API_VERSION || 'unknown';

/** 
  * Heartbeat route. 
  * @returns status code 200 if server is up and running (no content in body response).
 */
routes.get('/heartbeat', (req, res) => {
    res.status(200).end();
});

/** 
  * Version route. Returns the version of the API and status code 200 on success.
  * @returns {json} the API version number.
  */
routes.get('/version', (req, res) => {
    res.status(200).json({version : apiVersion});
});

module.exports = routes;
