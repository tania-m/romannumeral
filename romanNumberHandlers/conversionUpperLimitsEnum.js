"use strict";

/**
 * Enum for conversion upper limits.
 * @readonly
 * @enum {{name: string, limit: integer}}
 */
const ConversionUpperLimits = {
    SMALL:   { name: "0->255", limit: 255 },
    MEDIUM:  { name: "0->3999", limit: 3999 },
    LARGE: { name: "0->2200000000", limit: 2200000000 }
};

module.exports = Object.freeze(ConversionUpperLimits);