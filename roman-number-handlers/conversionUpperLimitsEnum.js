"use strict";

/**
 * Enum for conversion upper limits.
 * SMALL:   { name: "1->255", limit: 255 }: upper limit is 255 (included),
 * MEDIUM:  { name: "1->3999", limit: 3999 }: upper limit is 3999 (included),
 * LARGE: { name: "1->2200000000", limit: 2200000000 }: upper limit is 2200000000 (included).
 * @readonly
 * @enum {{name: string, limit: integer}}
 */
const ConversionUpperLimits = {
    SMALL:   { name: "1->255", limit: 255 },
    MEDIUM:  { name: "1->3999", limit: 3999 },
    LARGE: { name: "1->2200000000", limit: 2200000000 }
};

module.exports = Object.freeze(ConversionUpperLimits);