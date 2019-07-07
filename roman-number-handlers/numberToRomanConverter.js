"use strict";

// About roman numerals: https://www.mathsisfun.com/roman-numerals.html
// Roman numerals: Where is the zero?: https://skidos.com/roman-numerals-where-is-the-zero/
// For large roman numerals: http://roman-numerals.20m.com/

const DecimalNumberToRomanMapBuilder = require('./decimalToRomanMapBuilder.js');
const ConversionErrorTypeEnum = require('./conversionErrorCodeEnum.js');
const ConversionError = require('./conversionError.js');

/** This class is a converter for integers to roman numerals (values between 0 and 2200000000).
 */
class NumberToRomanConverter {
    /**
     * Construct a number to roman converted for values between 0 and 2200000000.
     * @returns {integer} upperLimit for number to roman conversion (defaults to 2200000000).
     */
    constructor(upperLimit=2200000000){
        this._lowLimit = 1;
        this._upperLimit = upperLimit;
        
        this._romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(this._upperLimit);
    }

    /**
     * This method turns an integer into a roman numeral.
     * @param {integer} numToConvert, an integer between 0 and 2200000000. Only integers are valid input values.
     * @returns {string} number converted to roman notation.
     */
    convertNumToRoman(numToConvert){
        if(Number.isNaN(numToConvert) 
            || !Number.isInteger(numToConvert) 
            || !Number.isFinite(numToConvert)){
            throw new ConversionError('Parameter is not an integer', 
                                        ConversionErrorTypeEnum.NOT_AN_INTEGER);
        }
        
        if(numToConvert === 0){ // roman numbers do not have a 0, give more details to caller about that case
            throw new ConversionError('Parameter value is 0, roman numbers do not have a 0. Zero is out of supported range for conversions. Smallest supported value is 1.', 
                                        ConversionErrorTypeEnum.VALUE_IS_ZERO,
                                        {
                                            lowerLimit: this._lowLimit
                                        });
        }

        if(numToConvert < this._lowLimit || numToConvert > this._upperLimit){
            throw new ConversionError('Parameter is not within range', 
                                        ConversionErrorTypeEnum.OUT_OF_RANGE, 
                                        {
                                            lowerLimit: this._lowLimit, 
                                            upperLimit: this._upperLimit
                                        }
                                    );
        }
        
        let result = '';
        for (let [keyDecimalValue, roman] of this._romanMap) { 
            // class contract of map builder: key values where added from largest to smallest
            
            while (numToConvert % keyDecimalValue < numToConvert) { // roman number will be build from left to right
                result = result.concat(roman); 
                numToConvert = numToConvert - keyDecimalValue; 
            }
        }
        // Possible improvement if we know the distribution of requests (frequencies of requests for values): 
        // First binary search the best key value to start from in the map...
        // (But this will not reduce asymptotic complexity, since in worse case with still have to go over the whole lookup map)
    
        return result;
    }
}

module.exports = NumberToRomanConverter;