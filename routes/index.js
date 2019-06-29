// Created: June 28th 2019
// Author: Tania Mathern
// Last edit: June 28th 2019

let apiVersion = '0.2.0';

const routes = require('express').Router();
const NumberToRomanConverter = require('./../romanNumberHandlers/convertNumberToRoman.js');

routes.get('/health', (req, res) => {
    res.status(200).json({ message: 'Healthy' });
});

// there are no side-effects in the NumberToRomanConverter class.
// so we can reuse it between requests, we don't need to reinstanciate it
const converter = new NumberToRomanConverter();

routes.get('/romannumeral', (req, res) => { // http://localhost:8080/romannumeral?query={integer}
    let queryValue = req.query.query;
    let valueToConvert = parseInt(queryValue, 10);
    // convert user input in case the number was sent as int
    if(Number.isNaN(num) 
            || !Number.isInteger(num) 
            || !Number.isFinite(num)){
                res.status(422).json({ error: e.code, 
                    message: e.message,
                    apiVersion: 'TOADD' });
    } else {
        try{
            let result = converter.convertNumToRoman(valueToConvert);
            res.status(200).json({ roman: result });
        }
        catch (e) {
            console.log(e);
            switch(e.code){
                // NOT_AN_INTEGER cannot happen, user input was validated before
                case 'OUT_OF_RANGE' : {
                    res.status(422).json({ error: e.code, 
                                            message: e.message });
                    break;
                }
                case 'VALUE_IS_ZERO' : {
                    res.status(422).json({ error: e.code, 
                                            message: e.message });
                    break;
                }
                default: {
                    // Express comes with a built-in error handler that takes care of any errors that might be encountered in the app.
                    throw e;
                }
            }
        }
    }
});

routes.get('*', function(req, res, next) {
    let err = new Error('Not Found on this server');
    err.statusCode = 404;
    next(err);
});

module.exports = routes;