"use strict";

/** Custom exception class for conversion errors.
 */
class ConversionError extends Error {
    /**
     * Construct a custom conversion exception/error.
     * @param {string} message, error message
     * @param {string} code, error code
     */
    constructor (message, code) {
        super(message);

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        
        this.code = code;
    }
};

module.exports = ConversionError;