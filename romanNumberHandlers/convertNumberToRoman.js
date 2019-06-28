// Created: June 28th 2019
// Author: Tania Mathern
// Last edit: June 28th 2019

let ConversionError = require('./conversionError.js');

class NumberToRomanConverter {
    constructor(){
        this.lowLimit = 0;
        this.upperLimit = 3999;       

        this.decimalToRomanMap = this.buildNumberToRomanMap();
    }

    buildNumberToRomanMap(){
        let romanMap = new Map(); 

        // We need the equivalent to romans characters:
        // C,L,X,V,I : 100, 50, 10, 5, 1 to built numbers;
        // but also some exceptions because of how roman notation works
        // (XC is 100-10=90, CX is 100+10=110)
        // XC, XL, IX, IV: 90, 40, 9, 4.

        // We can build all numbers up to 255 using this "alphabet"
        // so we map the "alphabets"
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