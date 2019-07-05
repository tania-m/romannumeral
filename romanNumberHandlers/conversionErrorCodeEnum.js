"use strict";

/**
 * Enum for error codes.
 * NOT_AN_INTEGER: 'NOT_AN_INTEGER': the value is not an integer/cannot be converter to an integer,
 * OUT_OF_RANGE: 'OUT_OF_RANGE': the value is not in the supported conversion range,
 * VALUE_IS_ZERO: 'VALUE_IS_ZERO': the value to convert is 0 (no 0 in roman litterals).
 * @readonly
 * @enum {{error_code: string}}
 */
const ConversionErrorCodes = {
    NOT_AN_INTEGER: 'NOT_AN_INTEGER',
    OUT_OF_RANGE: 'OUT_OF_RANGE',
    VALUE_IS_ZERO: 'VALUE_IS_ZERO'
};

module.exports = Object.freeze(ConversionErrorCodes);