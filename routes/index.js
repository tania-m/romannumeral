"use strict";

const apiVersion = process.env.API_VERSION || 'unknown';

const routes = require('express').Router();
const NumberToRomanConverter = require('./../romanNumberHandlers/numberToRomanConverter.js');

/*
    Heartbeat route. Returns status code 200 if server is up and running.
*/
routes.get('/heartbeat', (req, res) => {
    res.status(200).end();
});

/*
    Version route. Returns the version of the API and status code 200 on success.
*/
routes.get('/version', (req, res) => {
    res.status(200).json({version : apiVersion});
});

// there are no side-effects  and no state in the NumberToRomanConverter class. Reuse it between requests.
const converter = new NumberToRomanConverter();

/*
    Numeral to roman converter route.
    Takes an integer (between 0 and 2200000000) as query parameter and converts it to a roman number.
    Example route: http://localhost:8080/romannumeral?query={integer}
    Success: returns status code 200 on success and the converted value;
    Error: returns status code 422 with error code and error message.
*/
routes.get('/romannumeral', (req, res) => {
    let queryValue = req.query.query;

    // convert user input in case the number was sent as string
    // (sometimews browser or proxies do conversions)
    let valueToConvert = parseInt(queryValue, 10);

    try{
        let result = converter.convertNumToRoman(valueToConvert);
        res.status(200).json({ roman: result });
    }
    catch (e) {
        switch(e.code){
            case 'NOT_AN_INTEGER' :
            case 'OUT_OF_RANGE' : 
            case 'VALUE_IS_ZERO' : {
                res.status(422).json({ error: e.code, 
                                        message: e.message,
                                        apiVersion: apiVersion });
                break;
            }
            default: {
                // Express comes with a built-in error handler that takes care of any errors that might be encountered in the app.
                throw e;
            }
        }
    }
});
// **Note**: Could add some memoization and or LRU caching.

/*
    Returns status code 404 and message "URL not found"
    for any URL/route not found on this server
*/
routes.get('*', function(req, res, next) {
    res.status(404).json({ message: 'URL not found', status: 404 });
});

module.exports = routes;