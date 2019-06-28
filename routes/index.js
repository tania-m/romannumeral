const routes = require('express').Router();
const NumberToRomanConverter = require('./../romanNumberHandlers/convertNumberToRoman.js');

routes.get('/health', (req, res) => {
    res.status(200).json({ message: 'Healthy' });
});

// there are no side-effects in this class.
// so we can reuse it between requests, we don't need to reinstanciate it
const converter = new NumberToRomanConverter();

routes.get('/romannumeral', (req, res) => { // http://localhost:8080/romannumeral?query={integer}
    let valueToConvert = req.query.query;

    //check user input 
    let filtered = parseInt(valueToConvert, 10);

    try{
        let result = converter.convertNumToRoman(filtered);
        res.status(200).json({ roman: result });
    }
    catch (e) {
        console.log(e);
        switch(e.code){
            case 'NOT_AN_INTEGER' : {
                res.status(422).json({ error: e.code, 
                                        message: e.message,
                                        apiVersion: 'TOADD' });
                break;
            }
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
});

module.exports = routes;