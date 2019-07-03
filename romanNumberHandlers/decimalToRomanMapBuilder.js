"use strict";

// About roman numerals: https://www.mathsisfun.com/roman-numerals.html

// For large roman numerals: http://roman-numerals.20m.com/ 
//  => \u0305 is the UTF-8 character to put a bar on letters

/** This class contains the map needed to convert decimal integers to roman numbers (values between 0 and 2200000000).
 */
class DecimalNumberToRomanMapBuilder{
    /**
     * This method builds the lookup table for key integer to roman values.
     * @returns {string} lookup map, values are added from largest to smallest key values
     */
    static buildNumberToRomanMap(upperLimit){
        let romanMap = new Map(); 
        /* 
            **Note**: Here we have a limit in size, so the look-up table is good:
            We don't need to reconstruct the key roman numerals for large numbers.
            BUT if we remove the upper limit, we will have to construct the litterals dynamically;
            that's were we can start using the pattern we see ermerging:
            large numbers follow the notation rule for numbers between 1 and 1000
            with additional bars on top depending on the size.
        */
        
        // order of addition is important (we want largest to smallest)
        // Map is ordered in the order of insertion so this holds.
        if(upperLimit >= 4000){ // add mapping for large numbers
            romanMap = this._buildNumberToRomanMapForLargeNumbers(romanMap);
            romanMap = this._buildNumberToRomanMapForMidsizeNumbers(romanMap);
        }

        if(upperLimit >= 255){
            romanMap = this._buildNumberToRomanMapForThousands(romanMap);
        }
        
        if(upperLimit >= 0){ // "base" mappings
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