"use strict";

/** Custom exception class for conversion errors.
 */
class ConversionError extends Error {
    /**
     * Construct a custom conversion exception/error.
     * @param {string} message, error message
     * @param {string} code, error code
     * @param {object} details, contains details about the error (may be empty)
     */
    constructor (message, code, details) {
        super(message);

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);   
        
        this.code = code;
        if(details !== null){
            this.details = details;   
        } 
    }
};

module.exports = ConversionError;