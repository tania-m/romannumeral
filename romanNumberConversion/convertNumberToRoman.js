// Created: June 28th 2019
// Author: Tania Mathern
// Last edit: June 28th 2019

let lowLimit = 0;
let upperLimit = 255;

function convertNumToRoman(num){
    // start by checking if the parameter is actually a number...
    if(Number.isNaN(num) 
        || !Number.isInteger(num) 
        || !Number.isFinite(num)){
            console.log("Handle exception here");
        return '';
    }

    // check the conditions we have on the number
    if(num < lowLimit || num > upperLimit){
        console.log("Handle exception here too");
        return '';
    }

    if(num === 0){
        // roman number do not have a 0
        console.log('0');
        return '';
    }

    // now we are sure we have a number we can handle
    // Result will hold the converted value
    let result = '';

    // We need the equivalent to romans characters:
    // C,L,X,V,I : 100, 50, 10, 5, 1 to built numbers;
    // but also some exceptions because of how roman notation works
    // (XC is 100-10=90, CX is 100+10=110)
    // XC, XL, IX, IV: 90, 40, 9, 4.

    // We can build all numbers up to 255 using this "alphabet":
    let romanMap = new Map(); // use a map for clarity. 
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
    
    // start converting by looping over the decimal values
    for (let [decimal, roman] of romanMap) { // keys in a map are kept in order of addition
        // so we have the key in the sorted order we need, aka from largest to smallest
        
        // roman number will be build from left to right
        while (num % decimal < num) { // while we are still working on the same  roman character    
            result = result + roman; // append the roman char to the result
            num = num - decimal; // and reduce the num's value by what we just converted
        }
    }

    return result;
}






// start only looking at functionality, tests in same file
let assert = require('assert');

describe('Basic number to roman conversion (0-255)', function () {
    it('should convert 1 to I', function () {
            assert.equal(convertNumToRoman(1), 'I');
        });

    it('should convert 5 to V', function () {
            assert.equal(convertNumToRoman(5), 'V');
        });

    it('should convert 10 to X', function () {
            assert.equal(convertNumToRoman(10), 'X');
        });

    it('should convert 50 to L', function () {
            assert.equal(convertNumToRoman(50), 'L');
        });

    it('should convert 100 to C', function () {
            assert.equal(convertNumToRoman(100), 'C');
        });
});

describe('Special cases number to roman conversion (0-255)', function () {
    it('should convert 4 to IV', function () {
            assert.equal(convertNumToRoman(4), 'IV');
        });

    it('should convert 9 to IX', function () {
            assert.equal(convertNumToRoman(9), 'IX');
        });

    it('should convert 40 to XL', function () {
            assert.equal(convertNumToRoman(40), 'XL');
        });

    it('should convert 90 to XC', function () {
            assert.equal(convertNumToRoman(90), 'XC');
        });
});

describe('General number to roman conversion (0-255)', function () {
    it('should return 123 converted to CXIII', function () {
            assert.equal(convertNumToRoman(123), 'CXXIII');
        });
    it('should return 149 converted to CXLIX', function () {
            assert.equal(convertNumToRoman(149), 'CXLIX');
        });
    it('should return 243 converted to CCXLIII', function () {
            assert.equal(convertNumToRoman(243), 'CCXLIII');
        });
    it('should return 244 converted to CCXLIV', function () {
            assert.equal(convertNumToRoman(244), 'CCXLIV');
        });
    it('should return 249 converted to CCXLIV', function () {
            assert.equal(convertNumToRoman(249), 'CCXLIX');
        });
    it('should return 255 converted to CCLV', function () {
            assert.equal(convertNumToRoman(255), 'CCLV');
        });
    it('should return 8 converted to VIII', function () {
            assert.equal(convertNumToRoman(8), 'VIII');
        });
});

describe('Larger range number to roman conversion (0-3999)', function () {
    it('should convert 500 to D', function () {
            assert.equal(convertNumToRoman(500), 'D');
        });

    it('should convert 1000 to M', function () {
            assert.equal(convertNumToRoman(1000), 'M');
        });

    it('should convert 1503 to ', function () {
            assert.equal(convertNumToRoman(1503), 'MDIII');
        });
    
    it('should convert 1606 to ', function () {
            assert.equal(convertNumToRoman(1606), 'MDCVI');
        });

    it('should convert 1408 to ', function () {
            assert.equal(convertNumToRoman(1408), 'MCDVIII');
        });
    
    it('should convert 3999 to ', function () {
            assert.equal(convertNumToRoman(3999), 'MMMCMXCIX');
        });

});