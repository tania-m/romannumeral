"use strict";

const NumberToRomanConverter = require('./../romanNumberHandlers/numberToRomanConverter.js'),
        ConverterUpperLimitsEnum = require('./../romanNumberHandlers/conversionUpperLimitsEnum.js'),
        ConversionErrorTypeEnum = require('./../romanNumberHandlers/conversionErrorCodeEnum.js');

const routes = require('express').Router();

const apiVersion = process.env.API_VERSION || '1.0.0';

/**
 * Convert a number to roman converted for values between 0 and 2200000000. 
 * There are no side-effects, no state in the NumberToRomanConverter class. Reuse it between requests.
 * Once created, this object is read-only.
*/
const converter = Object.freeze(new NumberToRomanConverter(ConverterUpperLimitsEnum.LARGE.limit));

/** 
  * Numeral to roman converter route.
  * Takes an integer (between 0 and 2200000000) as query parameter and converts it to a roman number.
  * Example route: http://localhost:8080/romannumeral?query={integer}
  * @returns {json} returns status code 200 on success and the converted value; on error: returns status code 422 with error code and error message.
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
        if(e.code !== undefined && e.code !== null){ // if this is used as library, e.code might not be here for all Errors (e.g. Browser)
            let errorObject = {};
            switch(e.code){
                case ConversionErrorTypeEnum.OUT_OF_RANGE :
                case ConversionErrorTypeEnum.NOT_AN_INTEGER :
                case ConversionErrorTypeEnum.VALUE_IS_ZERO : {
                    errorObject = { error: e.code, 
                                        message: e.message,
                                        apiVersion: apiVersion
                                    };
                    if(e.details !== null){
                        errorObject.details = e.details;
                    }
                    res.status(422).json(errorObject);
                    break;
                }
                default: { // something really wrong happened, crash early
                    throw e;
                }
            }
        } else { // something really wrong happened, crash early
            throw e;
        }
    }
});

module.exports = routes;