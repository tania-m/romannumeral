let assert = require('assert');

/* Tests: Number to Roman conversion */
describe('Basic number to roman conversion (0-255)', function () {
    it('should convert 1 to I', function () {
            assert.equal(convertNumToRoman(1), 'I');
        });

    it('should convert 5 to V', function () {
            assert.equal(convertNumToRoman(5), 'V');
        });

    it('should convert 10 to X', function () {
            assert.equal(convertNumToRoman(10), 'X');
        });

    it('should convert 50 to L', function () {
            assert.equal(convertNumToRoman(50), 'L');
        });

    it('should convert 100 to C', function () {
            assert.equal(convertNumToRoman(100), 'C');
        });
});

describe('Special cases number to roman conversion (0-255)', function () {
    it('should convert 4 to IV', function () {
            assert.equal(convertNumToRoman(4), 'IV');
        });

    it('should convert 9 to IX', function () {
            assert.equal(convertNumToRoman(9), 'IX');
        });

    it('should convert 40 to XL', function () {
            assert.equal(convertNumToRoman(40), 'XL');
        });

    it('should convert 90 to XC', function () {
            assert.equal(convertNumToRoman(90), 'XC');
        });
});

describe('General number to roman conversion (0-255)', function () {
    it('should return 123 converted to CXIII', function () {
            assert.equal(convertNumToRoman(123), 'CXXIII');
        });
    it('should return 149 converted to CXLIX', function () {
            assert.equal(convertNumToRoman(149), 'CXLIX');
        });
    it('should return 243 converted to CCXLIII', function () {
            assert.equal(convertNumToRoman(243), 'CCXLIII');
        });
    it('should return 244 converted to CCXLIV', function () {
            assert.equal(convertNumToRoman(244), 'CCXLIV');
        });
    it('should return 249 converted to CCXLIV', function () {
            assert.equal(convertNumToRoman(249), 'CCXLIX');
        });
    it('should return 255 converted to CCLV', function () {
            assert.equal(convertNumToRoman(255), 'CCLV');
        });
    it('should return 8 converted to VIII', function () {
            assert.equal(convertNumToRoman(8), 'VIII');
        });
});

describe('Larger range number to roman conversion (0-3999)', function () {
    it('should convert 500 to D', function () {
            assert.equal(convertNumToRoman(500), 'D');
        });

    it('should convert 1000 to M', function () {
            assert.equal(convertNumToRoman(1000), 'M');
        });

    it('should convert 1503 to ', function () {
            assert.equal(convertNumToRoman(1503), 'MDIII');
        });
    
    it('should convert 1606 to ', function () {
            assert.equal(convertNumToRoman(1606), 'MDCVI');
        });

    it('should convert 1408 to ', function () {
            assert.equal(convertNumToRoman(1408), 'MCDVIII');
        });
    
    it('should convert 3999 to ', function () {
            assert.equal(convertNumToRoman(3999), 'MMMCMXCIX');
        });

});