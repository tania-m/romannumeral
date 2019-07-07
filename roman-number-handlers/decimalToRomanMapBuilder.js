"use strict";

// About roman numerals: https://www.mathsisfun.com/roman-numerals.html
// Roman numerals: Where is the zero: https://skidos.com/roman-numerals-where-is-the-zero/

// For large roman numerals: http://roman-numerals.20m.com/ 
//  => \u0305 is the UTF-8 character to put a bar on letters

/** This class contains the map needed to convert decimal integers to roman numbers (values between 0 and 2200000000).
 */
class DecimalNumberToRomanMapBuilder{
    /**
     * This method builds the lookup table for key integer to roman values. 
     * Keys in the map are sorted in decreasing order.
     * Here we have a limit in size for values that are convertible, so we use a lookup table for key values.:
     * We don't need to reconstruct the key roman numerals for large numbers each time we convert.
     * @returns {string} lookup map, values are added from largest to smallest key values
     */
    static buildNumberToRomanMap(upperLimit){
        let romanMap = new Map(); 

        // Order of addition into the Map is important (we want largest to smallest).
        // Map in JS is ordered in the order of insertion so this holds and we can use Map. Map also ensures we have no duplicate key.
        // If the sorting would not hold, we would have to come up with a Data structure that keeps elements sorted and without duplicates. 
        // (e.g. array containing objects of type {key: val, roman: romanVal} with a custom sort based on the keyValue for ordering)
        if(upperLimit >= 4000){ // add mapping for large numbers
            romanMap = this._buildNumberToRomanMapForLargeNumbers(romanMap);
            romanMap = this._buildNumberToRomanMapForMidsizeNumbers(romanMap);
            /* 
                **Note**: If we remove the upper limit, we will have to construct the roman litterals dynamically;
                that's were we can start using the pattern we see emerging:
                large numbers follow the notation rule for numbers between 1 and 1000
                with additional bars on top depending on the size (number of zeros).
            */
        }

        if(upperLimit > 255){
            romanMap = this._buildNumberToRomanMapForThousands(romanMap);
        }
        
        if(upperLimit > 0){ // "base" mappings
            romanMap = this._buildNumberToRomanMapForSmallNumbers(romanMap);
        }   

        return Object.freeze(romanMap);
    }

    /** Builds the map from decimal to romans for numbers with key values from 1000000 to 1000000000. 
     * Not all decimal numbers need a representation, a predefined set of values can help built a lot of others.
     * @param {Map} decimalToRomanMap, a map to contain decimal integer to roman mapping
     * @returns {Map} containing the additional mappings for large numbers
    */
    static _buildNumberToRomanMapForLargeNumbers(decimalToRomanMap){
        decimalToRomanMap.set(1000000000, 'M\u0305\u0305');

        decimalToRomanMap.set(900000000, 'C\u0305\u0305M\u0305\u0305');
        decimalToRomanMap.set(500000000, 'D\u0305\u0305');
        decimalToRomanMap.set(400000000, 'C\u0305\u0305D\u0305\u0305');
        decimalToRomanMap.set(100000000, 'C\u0305\u0305');

        decimalToRomanMap.set(90000000, 'X\u0305\u0305C\u0305\u0305');
        decimalToRomanMap.set(50000000, 'L\u0305\u0305');
        decimalToRomanMap.set(40000000, 'X\u0305\u0305L\u0305\u0305');
        decimalToRomanMap.set(10000000, 'X\u0305\u0305');

        decimalToRomanMap.set(9000000, 'I\u0305\u0305X\u0305\u0305');
        decimalToRomanMap.set(5000000, 'V\u0305\u0305');
        decimalToRomanMap.set(4000000, 'I\u0305\u0305V\u0305\u0305');
        decimalToRomanMap.set(1000000, 'M\u0305');

        return decimalToRomanMap;
    }

    /** Builds the map from decimal to romans for numbers with key values from 4000 to 90000. 
     * Not all decimal numbers need a representation, a predefined set of values can help built a lot of others.
     * @param {Map} decimalToRomanMap, a map to contain decimal integer to roman mapping
     * @returns {Map} containing additional the mappings for midsize numbers
    */
    static _buildNumberToRomanMapForMidsizeNumbers(decimalToRomanMap){
        decimalToRomanMap.set(900000, 'C\u0305M\u0305');
        decimalToRomanMap.set(500000, 'D\u0305');
        decimalToRomanMap.set(400000, 'C\u0305D\u0305');
        decimalToRomanMap.set(100000, 'C\u0305');

        decimalToRomanMap.set(90000, 'X\u0305C\u0305');
        decimalToRomanMap.set(50000, 'L\u0305');
        decimalToRomanMap.set(40000, 'X\u0305L\u0305');
        decimalToRomanMap.set(10000, 'X\u0305');

        decimalToRomanMap.set(9000, 'I\u0305X\u0305');
        decimalToRomanMap.set(5000, 'V\u0305');
        decimalToRomanMap.set(4000, 'I\u0305V\u0305');

        return decimalToRomanMap;
    }

    /** Builds the map from decimal to romans with key values for numbers from 400 to 1000.
     *  Not all decimal numbers need a representation, a predefined set of values can help built a lot of others.
     *  0 is excluded because roman numbers don't have a 0.      * 
     * @param {Map} decimalToRomanMap, a map to contain decimal integer to roman mapping
     * @returns {Map} containing the mappings
    */
    static _buildNumberToRomanMapForThousands(decimalToRomanMap){
        decimalToRomanMap.set(1000, 'M');
        decimalToRomanMap.set(900, 'CM');
        decimalToRomanMap.set(500, 'D');
        decimalToRomanMap.set(400, 'CD');

        return decimalToRomanMap;
    }

    /** Builds the map from decimal to romans with key values for numbers from 1 to 100.
     *  Not all decimal numbers need a representation, a predefined set of values can help built a lot of others.
     *  0 is excluded because roman numbers don't have a 0.      * 
     * @param {Map} decimalToRomanMap, a map to contain decimal integer to roman mapping
     * @returns {Map} containing the mappings
    */
    static _buildNumberToRomanMapForSmallNumbers(decimalToRomanMap){
        decimalToRomanMap.set(100, 'C');
        decimalToRomanMap.set(90, 'XC');
        decimalToRomanMap.set(50, 'L');
        decimalToRomanMap.set(40, 'XL');
        decimalToRomanMap.set(10, 'X');
        decimalToRomanMap.set(9, 'IX');
        decimalToRomanMap.set(5, 'V');
        decimalToRomanMap.set(4, 'IV');
        decimalToRomanMap.set(1, 'I');

        return decimalToRomanMap;
    }
}

module.exports = DecimalNumberToRomanMapBuilder;





/*
Why do we need a lookup table?
An alphabet A is a finite non-empty set of symbols. In our case, to represent roman numerals,
we need a set of symbols that represent key values with which we can construct all other. The set of 
symboles is finite because we have an upper limit for the conversion. Here, for instance, "I" and "V"
are letters of the alphabet. "IV", despite being written with two characters, is also considered to be
a letter of the alphabet, since it is the way to write 4.

Some symbols are repeated in keys. Why do we need an extended alphabet?
Here, I have chosen to use an extended alphabet in order to be able to use more than one roman numeral
conversion algorithm: The algorithm I used in numberToRomanConverter needs a table with keys for values like 
4 and 9 and builds the string from left to right (reading direction). That avoids to have to reverse the string
before sending it back. 
Another way to do the conversion is to start doing it from right to left. In that case,
we can use a smaller map which doesn't include cases for IX and IV (for instance), because the algorithm can
"move around" in the string and place the symbols where they are needed to form IV (for instance). 
Then, before returning the result, the string has to be reversed.

Can we reduce the needed space?
We can reduce the needed space for that map by using another conversion algorithm. But this would constrain
indirectly the numberToRomanConverter class to use an algorithm that can be supported by the lookup map.
This indirectly creates a logical dependance, that I wanted to avoid here. The extended map covers more
than one algorithm (even if some algorithms may have to filter out some values of the map).
*/