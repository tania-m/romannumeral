"use strict";

/**
 * Enum for error codes.
 * @readonly
 * @enum {{error_code: string}}
 */
const ConversionErrorCodes = {
    NOT_AN_INTEGER: 'NOT_AN_INTEGER',
    OUT_OF_RANGE: 'OUT_OF_RANGE',
    VALUE_IS_ZERO: 'VALUE_IS_ZERO',
};

module.exports = Object.freeze(ConversionErrorCodes);