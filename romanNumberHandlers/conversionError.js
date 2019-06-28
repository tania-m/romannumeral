class ConversionError extends Error {
    constructor (message, code) {
        super(message);

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        
        this.code = code;
    }
};

module.exports = ConversionError;