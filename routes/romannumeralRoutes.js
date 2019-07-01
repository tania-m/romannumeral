"use strict";

const NumberToRomanConverter = require('./../romanNumberHandlers/numberToRomanConverter.js');
const routes = require('express').Router();

const apiVersion = process.env.API_VERSION || '1.0.0';

// there are no side-effects, no state in the NumberToRomanConverter class. Reuse it between requests.
const converter = Object.freeze(new NumberToRomanConverter());

/** 
  * Numeral to roman converter route.
  * Takes an integer (between 0 and 2200000000) as query parameter and converts it to a roman number.
  * Example route: http://localhost:8080/romannumeral?query={integer}
  * @returns {json} On success: returns status code 200 on success and the converted value; on error: returns status code 422 with error code and error message.
*/
routes.get('/romannumeral', (req, res) => {
    const queryValue = req.query.query;

    // convert user input in case the number was sent as string
    // (sometimews browser or proxies do conversions to string) 
    const conversionRadix = 10;
    const valueToConvert = parseInt(queryValue, conversionRadix);

    try {
        const result = converter.convertNumToRoman(valueToConvert);
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
// **Note**: Could add some memoization and/or LRU caching if traffic gets higher.

module.exports = routes;