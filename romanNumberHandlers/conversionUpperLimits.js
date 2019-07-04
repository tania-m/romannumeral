"use strict";

/**
 * Enum for conversion upper limits.
 * @readonly
 * @enum {{name: string, hex: string}}
 */
const Limits = {
    small:   { name: "0->255", limit: 255 },
    medium:  { name: "0->3999", limit: 3999 },
    large: { name: "0->2200000000", limit: 2200000000 }
};

module.exports = Object.freeze(Limits);