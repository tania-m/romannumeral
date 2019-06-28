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

describe('No side-effects in between number to roman conversion (0-255)', function () {
    it('should do more than one conversion (in serie)', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1), 'I');
            assert.equal(converter.convertNumToRoman(249), 'CCXLIX');
            assert.equal(converter.convertNumToRoman(5), 'V');            
            assert.equal(converter.convertNumToRoman(40), 'XL');
            assert.equal(converter.convertNumToRoman(255), 'CCLV');
            assert.equal(converter.convertNumToRoman(4), 'IV');
            assert.equal(converter.convertNumToRoman(244), 'CCXLIV');
            assert.equal(converter.convertNumToRoman(243), 'CCXLIII');
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

    it('should convert 1503 to MDIII', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1503), 'MDIII');
        });
    
    it('should convert 1606 to MDCVI', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1606), 'MDCVI');
        });

    it('should convert 1408 to MCDVIII', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1408), 'MCDVIII');
        });
    
    it('should convert 3999 to MMMCMXCIX', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(3999), 'MMMCMXCIX');
        });
});

describe('Key numbers conversions for large number conversions (>3999 up to 2 200 000 000)', function () {
    it('should convert 4000 to I\u0305V\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(4000), 'I\u0305V\u0305');
        });
    
    it('should convert 5000 to V\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(5000), 'V\u0305');
        });

    it('should convert 9000 to I\u0305X\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(9000), 'I\u0305X\u0305');
        });

    it('should convert 10000 to X\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(10000), 'X\u0305');
        });

    it('should convert 40000 to X\u0305L\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(40000), 'X\u0305L\u0305');
        });
    
        it('should convert 50000 to L\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(50000), 'L\u0305');
        });

    it('should convert 90000 to X\u0305C\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(90000), 'X\u0305C\u0305');
        });

    it('should convert 100000 to C\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(100000), 'C\u0305');
        });

        it('should convert 400000 to C\u0305D\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(400000), 'C\u0305D\u0305');
        });

        it('should convert 500000 to D\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(500000), 'D\u0305');
        });

        it('should convert 900000 to C\u0305M\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(900000), 'C\u0305M\u0305');
        });

        it('should convert 1000000 to M\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1000000), 'M\u0305');
        });

        it('should convert 4000000 to I\u0305\u0305V\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(4000000), 'I\u0305\u0305V\u0305\u0305');
        });

        it('should convert 5000000 to V\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(5000000), 'V\u0305\u0305');
        });

        it('should convert 9000000 to ', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(9000000), 'I\u0305\u0305X\u0305\u0305');
        });

        it('should convert 10000000 to X\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(10000000), 'X\u0305\u0305');
        });

        it('should convert 40000000 to X\u0305\u0305L\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(40000000), 'X\u0305\u0305L\u0305\u0305');
        });

        it('should convert 50000000 to L\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(50000000), 'L\u0305\u0305');
        });

        it('should convert 90000000 to X\u0305\u0305C\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(90000000), 'X\u0305\u0305C\u0305\u0305');
        });

        it('should convert 100000000 to C\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(100000000), 'C\u0305\u0305');
        });

        it('should convert 400000000 to C\u0305\u0305D\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(400000000), 'C\u0305\u0305D\u0305\u0305');
        });

        it('should convert 500000000 to D\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(500000000), 'D\u0305\u0305');
        });

        it('should convert 900000000 to C\u0305\u0305M\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(900000000), 'C\u0305\u0305M\u0305\u0305');
        });

        it('should convert 1000000000 to M\u0305\u0305', function () {
            let converter = new NumberToRomanConverter();
            assert.equal(converter.convertNumToRoman(1000000000), 'M\u0305\u0305');
        });
});

describe('Large number conversions (>3999 up to 2 200 000 000)', function () {
    it('should convert 1900400000 to M\u0305\u0305C\u0305\u0305M\u0305\u0305C\u0305D\u0305', function () {
        let converter = new NumberToRomanConverter();
        assert.equal(converter.convertNumToRoman(1900400000), 'M\u0305\u0305C\u0305\u0305M\u0305\u0305C\u0305D\u0305');
    });

    it('should convert 1900400003 to M\u0305\u0305C\u0305\u0305M\u0305\u0305C\u0305D\u0305III', function () {
        let converter = new NumberToRomanConverter();
        assert.equal(converter.convertNumToRoman(1900400003), 'M\u0305\u0305C\u0305\u0305M\u0305\u0305C\u0305D\u0305III');
    });

    it('should convert 1900490004 to M\u0305\u0305C\u0305\u0305M\u0305\u0305C\u0305D\u0305X\u0305C\u0305IV', function () {
        let converter = new NumberToRomanConverter();
        assert.equal(converter.convertNumToRoman(1900490004), 'M\u0305\u0305C\u0305\u0305M\u0305\u0305C\u0305D\u0305X\u0305C\u0305IV');
    });

    it('should convert 2200000000 to M\u0305\u0305M\u0305\u0305C\u0305\u0305C\u0305\u0305', function () {
        let converter = new NumberToRomanConverter();
        assert.equal(converter.convertNumToRoman(2200000000), 'M\u0305\u0305M\u0305\u0305C\u0305\u0305C\u0305\u0305');
    });
});