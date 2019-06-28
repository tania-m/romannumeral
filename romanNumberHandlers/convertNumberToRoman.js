// Created: June 28th 2019
// Author: Tania Mathern
// Last edit: June 28th 2019

// About roman numerals: https://www.mathsisfun.com/roman-numerals.html
// For large roman numerals: http://roman-numerals.20m.com/
// About vedic mathematics: http://mathlearners.com/vedic-mathematics/basic-requisites/

let ConversionError = require('./conversionError.js');

class NumberToRomanConverter {
    constructor(){
        this.lowLimit = 0;
        this.upperLimit = 2200000000; // smaller than       

        this.decimalToRomanMap = this._buildNumberToRomanMap();
    }

    _buildNumberToRomanMap(){
        let romanMap = new Map(); 

        // We need the equivalent to romans characters for 1 to 1000:
        // C,L,X,V,I : 100, 50, 10, 5, 1 to built numbers;
        // but also some exceptions because of how roman notation works
        // (XC is 100-10=90, CX is 100+10=110)
        // XC, XL, IX, IV: 90, 40, 9, 4.
        // This is needed because roman numbers are position-dependent

        // We can build all numbers up to **2 200 000 000** using this "alphabet"
        // so we map the "alphabets":

        /* 
            Note: Here we have a limit in size, so the look-up table is good:
            We don't need to reconstruct the key roman numerals for large numbers.
            BUT if we remove the upper limit, we will have to construct the litterals dynamically;
            that's were we can start using the pattern we see ermerging:
            large numbers follow the notation rule for numbers between 1 and 1000
            with additional bars on top depending on the size.
        */
        romanMap.set(1000000000, 'M\u0305\u0305');

        romanMap.set(900000000, 'C\u0305\u0305M\u0305\u0305');
        romanMap.set(500000000, 'D\u0305\u0305');
        romanMap.set(400000000, 'C\u0305\u0305D\u0305\u0305');
        romanMap.set(100000000, 'C\u0305\u0305');

        romanMap.set(90000000, 'X\u0305\u0305C\u0305\u0305');
        romanMap.set(50000000, 'L\u0305\u0305');
        romanMap.set(40000000, 'X\u0305\u0305L\u0305\u0305');
        romanMap.set(10000000, 'X\u0305\u0305');

        romanMap.set(9000000, 'I\u0305\u0305X\u0305\u0305');
        romanMap.set(5000000, 'V\u0305\u0305');
        romanMap.set(4000000, 'I\u0305\u0305V\u0305\u0305');
        romanMap.set(1000000, 'M\u0305');

        romanMap.set(900000, 'C\u0305M\u0305');
        romanMap.set(500000, 'D\u0305');
        romanMap.set(400000, 'C\u0305D\u0305');
        romanMap.set(100000, 'C\u0305');
        romanMap.set(90000, 'X\u0305C\u0305');
        romanMap.set(50000, 'L\u0305');
        romanMap.set(40000, 'X\u0305L\u0305');
        romanMap.set(10000, 'X\u0305');
        romanMap.set(9000, 'I\u0305X\u0305');
        romanMap.set(5000, 'V\u0305');
        romanMap.set(4000, 'I\u0305V\u0305');

        romanMap.set(1000, 'M');
        romanMap.set(900, 'CM');
        romanMap.set(500, 'D');
        romanMap.set(400, 'CD');
        romanMap.set(100, 'C');
        romanMap.set(90, 'XC');
        romanMap.set(50, 'L');
        romanMap.set(40, 'XL');
        romanMap.set(10, 'X');
        romanMap.set(9, 'IX');
        romanMap.set(5, 'V');
        romanMap.set(4, 'IV');
        romanMap.set(1, 'I');

        return romanMap;
    }

    convertNumToRoman(num){
        // start by checking if the parameter is actually a number...
        if(Number.isNaN(num) 
            || !Number.isInteger(num) 
            || !Number.isFinite(num)){
            throw new ConversionError('Parameter is not an integer', 'NOT_AN_INTEGER');
        }
    
        // check the conditions we have on the number
        if(num < this.lowLimit || num > this.upperLimit){
            throw new ConversionError('Parameter is not within range', 'OUT_OF_RANGE');
        }
    
        if(num === 0){
            // roman numbers do not have a 0
            throw new ConversionError('Parameter value is 0, roman numbers do not have a 0', 'VALUE_IS_ZERO');
        }
    

        // now we are sure we have a number we can handle
        // Result will hold the converted value
        let result = '';
        
        for (let [decimal, roman] of this.decimalToRomanMap) { // keys in a map are kept in order of addition
            // so we have the key in the sorted order we need, aka from largest to smallest
            
            // roman number will be build from left to right
            while (num % decimal < num) { // while we are still working on the same  roman character    
                result = result + roman; // append the roman char to the result
                num = num - decimal; // and reduce the num's value by what we just converted
            }
        }
    
        return result;
    }
}
module.exports = NumberToRomanConverter;

let demo = new NumberToRomanConverter();
console.log(demo._buildNumberToRomanMap());