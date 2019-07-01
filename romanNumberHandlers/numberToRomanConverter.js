"use strict";

// About roman numerals: https://www.mathsisfun.com/roman-numerals.html
// For large roman numerals: http://roman-numerals.20m.com/

const DecimalNumberToRomanMapBuilder = require('./decimalToRomanMapBuilder.js');
const ConversionError = require('./conversionError.js');

/** This class is a converter for integers to roman numerals (values between 0 and 2200000000).
 */
class NumberToRomanConverter {
    /**
     * Construct a number to roman converted for values between 0 and 2200000000
     */
    constructor(){
        this.lowLimit = 0;
        this.upperLimit = 2200000000;

        //const mapBuilder = new DecimalNumberToRomanMapBuilder(this.lowLimit, this.upperLimit);
        this._romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(this.upperLimit);
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
            throw new ConversionError('Parameter is not an integer', 'NOT_AN_INTEGER');
        }
        
        if(num < this.lowLimit || num > this.upperLimit){
            throw new ConversionError('Parameter is not within range', 'OUT_OF_RANGE');
        }
        
        if(num === 0){ // roman numbers do not have a 0
            throw new ConversionError('Parameter value is 0, roman numbers do not have a 0', 'VALUE_IS_ZERO');
        }
        
        // now we are sure we have a number we can handle. Result will hold the converted value
        let result = '';
        for (let [decimal, roman] of this._romanMap) { 
            // class contract of map builder: key values where added from largest to smallest
            // we need this to hold to use that algorithm (otherwise we would need to sort values beforehand)
            
            while (num % decimal < num) { // roman number will be build from left to right
                result = result + roman; 
                num = num - decimal; 
            }
        }
    
        return result;
    }
}

module.exports = NumberToRomanConverter;