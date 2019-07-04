"use strict";

// About roman numerals: https://www.mathsisfun.com/roman-numerals.html
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
        this._lowLimit = 0;
        this._upperLimit = upperLimit;
        
        this._romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(this._upperLimit);
    }

    /**
     * This method turns an integer into a roman numeral.
     * @param {integer} num, an integer between 0 and 2200000000. Only integers are valid input values.
     * @returns {string} number converted to roman notation.
     */
    convertNumToRoman(num){
        if(Number.isNaN(num) 
            || !Number.isInteger(num) 
            || !Number.isFinite(num)){
            throw new ConversionError('Parameter is not an integer', 
                                        ConversionErrorTypeEnum.NOT_AN_INTEGER);
        }
        
        if(num < this._lowLimit || num > this._upperLimit){
            throw new ConversionError('Parameter is not within range', 
                                        ConversionErrorTypeEnum.OUT_OF_RANGE, 
                                        {
                                            lowerLimit: this._lowLimit, 
                                            upperLimit: this._upperLimit
                                        }
                                    );
        }
        
        if(num === 0){ // roman numbers do not have a 0
            throw new ConversionError('Parameter value is 0, roman numbers do not have a 0', 
                                        ConversionErrorTypeEnum.VALUE_IS_ZERO);
        }
        
        // now we are sure we have a number we can handle. Result will hold the converted value
        let result = '';
        for (let [decimal, roman] of this._romanMap) { 
            // class contract of map builder: key values where added from largest to smallest
            // we need this to hold to use that algorithm (otherwise we would need to sort values beforehand)
            
            while (num % decimal < num) { // roman number will be build from left to right
                result = result.concat(roman); 
                num = num - decimal; 
            }
        }
    
        return result;
    }
}

module.exports = NumberToRomanConverter;