const NumberToRomanConverter = require('./../romanNumberHandlers/convertNumberToRoman.js');

let assert = require('assert');

describe('Basic number to roman conversion (0-255)', function () {
    it('should convert 1 to I', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1), 'I');
        });

    it('should convert 5 to V', function () {
            let converter = new NumberToRomanConverter();    
            assert.equal(converter.convertNumToRoman(5), 'V');
        });

    it('should convert 10 to X', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(10), 'X');
        });

    it('should convert 50 to L', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(50), 'L');
        });

    it('should convert 100 to C', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(100), 'C');
        });
});

describe('Special cases number to roman conversion (0-255)', function () {
    it('should convert 4 to IV', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(4), 'IV');
        });

    it('should convert 9 to IX', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(9), 'IX');
        });

    it('should convert 40 to XL', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(40), 'XL');
        });

    it('should convert 90 to XC', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(90), 'XC');
        });
});

describe('General number to roman conversion (0-255)', function () {
    it('should return 123 converted to CXIII', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(123), 'CXXIII');
        });
    it('should return 149 converted to CXLIX', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(149), 'CXLIX');
        });
    it('should return 243 converted to CCXLIII', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(243), 'CCXLIII');
        });
    it('should return 244 converted to CCXLIV', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(244), 'CCXLIV');
        });
    it('should return 249 converted to CCXLIV', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(249), 'CCXLIX');
        });
    it('should return 255 converted to CCLV', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(255), 'CCLV');
        });
    it('should return 8 converted to VIII', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(8), 'VIII');
        });
    it('should return 20 converted to XX', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(20), 'XX');
        });
});

describe('Larger range number to roman conversion (0-3999)', function () {
    it('should convert 500 to D', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(500), 'D');
        });

    it('should convert 1000 to M', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1000), 'M');
        });

    it('should convert 1503 to ', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1503), 'MDIII');
        });
    
    it('should convert 1606 to ', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1606), 'MDCVI');
        });

    it('should convert 1408 to ', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1408), 'MCDVIII');
        });
    
    it('should convert 3999 to ', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(3999), 'MMMCMXCIX');
        });

});