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

    // We can build all numbers up to 3999 using this "alphabet":
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
        while (num % decimal < num) {     
            result = result + roman; 
            num = num - decimal;
        }
    }

    return result;
}