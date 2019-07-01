"use strict";

const assert = require('assert');
const DecimalNumberToRomanMapBuilder = require('./../romanNumberHandlers/decimalToRomanMapBuilder.js');

describe('Integer to roman map structure', function () {
    it('should be frozen', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(Object.isFrozen(romanMap), true);
        });
});

describe('Integer to roman map contains base key values (0-255)', function () {
    it('should contain 1 to I mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(1), true);
            assert.equal(romanMap.get(1), 'I');
        });

    it('should contain 4 to IV mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(4), true);
            assert.equal(romanMap.get(4), 'IV');
        });
        
    it('should contain 5 to V mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(5), true);
            assert.equal(romanMap.get(5), 'V');
        });

    it('should contain 9 to IX mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(9), true);
            assert.equal(romanMap.get(9), 'IX');
        });
        
    it('should contain 10 to X mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(10), true);
            assert.equal(romanMap.get(10), 'X');
        });

    it('should contain 40 to XL mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(40), true);
            assert.equal(romanMap.get(40), 'XL');
        });
        
    it('should contain 50 to L mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(50), true);
            assert.equal(romanMap.get(50), 'L');
        });

    it('should contain 90 to XC mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(90), true);
            assert.equal(romanMap.get(90), 'XC');
        });

    it('should contain 100 to C mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(255);
            assert.equal(romanMap.has(100), true);
            assert.equal(romanMap.get(100), 'C');
        });
});

describe('Integer to roman map contains key values for thousands', function () {
    it('should contain 1 to I mapping', function () {
        let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
        assert.equal(romanMap.has(1), true);
        assert.equal(romanMap.get(1), 'I');
    });

    it('should contain 4 to IV mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(4), true);
            assert.equal(romanMap.get(4), 'IV');
        });
        
    it('should contain 5 to V mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(5), true);
            assert.equal(romanMap.get(5), 'V');
        });

    it('should contain 9 to IX mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(9), true);
            assert.equal(romanMap.get(9), 'IX');
        });
        
    it('should contain 10 to X mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(10), true);
            assert.equal(romanMap.get(10), 'X');
        });

    it('should contain 40 to XL mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(40), true);
            assert.equal(romanMap.get(40), 'XL');
        });
        
    it('should contain 50 to L mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(50), true);
            assert.equal(romanMap.get(50), 'L');
        });

    it('should contain 90 to XC mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(90), true);
            assert.equal(romanMap.get(90), 'XC');
        });

    it('should contain 100 to C mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(100), true);
            assert.equal(romanMap.get(100), 'C');
        });
        
    it('should contain 400 to CD mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(400), true);
            assert.equal(romanMap.get(400), 'CD');
        });

    it('should contain 500 to D mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(500), true);
            assert.equal(romanMap.get(500), 'D');
        });

    it('should contain 900 to CM mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(900), true);
            assert.equal(romanMap.get(900), 'CM');
        });

    it('should contain 1000 to M mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(3999);
            assert.equal(romanMap.has(1000), true);
            assert.equal(romanMap.get(1000), 'M');
        });
});

describe('Integer to roman map contains key values for ten-hundred thousands', function () {
    it('should contain 1 to I mapping', function () {
        let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
        assert.equal(romanMap.has(1), true);
        assert.equal(romanMap.get(1), 'I');
    });

    it('should contain 4 to IV mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(4), true);
            assert.equal(romanMap.get(4), 'IV');
        });
        
    it('should contain 5 to V mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(5), true);
            assert.equal(romanMap.get(5), 'V');
        });

    it('should contain 9 to IX mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(9), true);
            assert.equal(romanMap.get(9), 'IX');
        });
        
    it('should contain 10 to X mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(10), true);
            assert.equal(romanMap.get(10), 'X');
        });

    it('should contain 40 to XL mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(40), true);
            assert.equal(romanMap.get(40), 'XL');
        });
        
    it('should contain 50 to L mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(50), true);
            assert.equal(romanMap.get(50), 'L');
        });

    it('should contain 90 to XC mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(90), true);
            assert.equal(romanMap.get(90), 'XC');
        });

    it('should contain 100 to C mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(100), true);
            assert.equal(romanMap.get(100), 'C');
        });
        
    it('should contain 400 to CD mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(400), true);
            assert.equal(romanMap.get(400), 'CD');
        });

    it('should contain 500 to D mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(500), true);
            assert.equal(romanMap.get(500), 'D');
        });

    it('should contain 900 to CM mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(900), true);
            assert.equal(romanMap.get(900), 'CM');
        });

    it('should contain 1000 to M mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(1000), true);
            assert.equal(romanMap.get(1000), 'M');
        });

    it('should contain 4000 to I\u0305V\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(4000), true);
            assert.equal(romanMap.get(4000), 'I\u0305V\u0305');
        });

    it('should contain 5000 to V\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(5000), true);
            assert.equal(romanMap.get(5000), 'V\u0305');
        });

    it('should contain 9000 to I\u0305X\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(9000), true);
            assert.equal(romanMap.get(9000), 'I\u0305X\u0305');
        });

    it('should contain 10000 to X\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(10000), true);
            assert.equal(romanMap.get(10000), 'X\u0305');
        });

    it('should contain 40000 to X\u0305L\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(40000), true);
            assert.equal(romanMap.get(40000), 'X\u0305L\u0305');
        });

    it('should contain 50000 to L\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(50000), true);
            assert.equal(romanMap.get(50000), 'L\u0305');
        });

    it('should contain 90000 to X\u0305C\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(90000), true);
            assert.equal(romanMap.get(90000), 'X\u0305C\u0305');
        });

    it('should contain 100000 to C\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(100000), true);
            assert.equal(romanMap.get(100000), 'C\u0305');
        });

    it('should contain 400000 to C\u0305D\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(400000), true);
            assert.equal(romanMap.get(400000), 'C\u0305D\u0305');
        });

    it('should contain 500000 to D\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(500000), true);
            assert.equal(romanMap.get(500000), 'D\u0305');
        });

    it('should contain 900000 to C\u0305M\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(900000);
            assert.equal(romanMap.has(900000), true);
            assert.equal(romanMap.get(900000), 'C\u0305M\u0305');
        });
});

describe('Integer to roman map contains key values for millions and billions', function () {
    it('should contain 1 to I mapping', function () {
        let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
        assert.equal(romanMap.has(1), true);
        assert.equal(romanMap.get(1), 'I');
    });

    it('should contain 4 to IV mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(4), true);
            assert.equal(romanMap.get(4), 'IV');
        });
        
    it('should contain 5 to V mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(5), true);
            assert.equal(romanMap.get(5), 'V');
        });

    it('should contain 9 to IX mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(9), true);
            assert.equal(romanMap.get(9), 'IX');
        });
        
    it('should contain 10 to X mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(10), true);
            assert.equal(romanMap.get(10), 'X');
        });

    it('should contain 40 to XL mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(40), true);
            assert.equal(romanMap.get(40), 'XL');
        });
        
    it('should contain 50 to L mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(50), true);
            assert.equal(romanMap.get(50), 'L');
        });

    it('should contain 90 to XC mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(90), true);
            assert.equal(romanMap.get(90), 'XC');
        });

    it('should contain 100 to C mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(100), true);
            assert.equal(romanMap.get(100), 'C');
        });
        
    it('should contain 400 to CD mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(400), true);
            assert.equal(romanMap.get(400), 'CD');
        });

    it('should contain 500 to D mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(500), true);
            assert.equal(romanMap.get(500), 'D');
        });

    it('should contain 900 to CM mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(900), true);
            assert.equal(romanMap.get(900), 'CM');
        });

    it('should contain 1000 to M mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(1000), true);
            assert.equal(romanMap.get(1000), 'M');
        });

    it('should contain 4000 to I\u0305V\u0305 mapping', function () {
        let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
        assert.equal(romanMap.has(4000), true);
        assert.equal(romanMap.get(4000), 'I\u0305V\u0305');
    });

    it('should contain 5000 to V\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(5000), true);
            assert.equal(romanMap.get(5000), 'V\u0305');
        });

    it('should contain 9000 to I\u0305X\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(9000), true);
            assert.equal(romanMap.get(9000), 'I\u0305X\u0305');
        });

    it('should contain 10000 to X\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(10000), true);
            assert.equal(romanMap.get(10000), 'X\u0305');
        });

    it('should contain 40000 to X\u0305L\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(40000), true);
            assert.equal(romanMap.get(40000), 'X\u0305L\u0305');
        });

    it('should contain 50000 to L\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(50000), true);
            assert.equal(romanMap.get(50000), 'L\u0305');
        });

    it('should contain 90000 to X\u0305C\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(90000), true);
            assert.equal(romanMap.get(90000), 'X\u0305C\u0305');
        });

    it('should contain 100000 to C\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(100000), true);
            assert.equal(romanMap.get(100000), 'C\u0305');
        });

    it('should contain 400000 to C\u0305D\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(400000), true);
            assert.equal(romanMap.get(400000), 'C\u0305D\u0305');
        });

    it('should contain 500000 to D\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(500000), true);
            assert.equal(romanMap.get(500000), 'D\u0305');
        });

    it('should contain 900000 to C\u0305M\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(900000), true);
            assert.equal(romanMap.get(900000), 'C\u0305M\u0305');
        });

    it('should contain 1000000 to M\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(1000000), true);
            assert.equal(romanMap.get(1000000), 'M\u0305');
        });

    it('should contain 4000000 to I\u0305\u0305V\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(4000000), true);
            assert.equal(romanMap.get(4000000), 'I\u0305\u0305V\u0305\u0305');
        });

    it('should contain 5000000 to V\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(5000000), true);
            assert.equal(romanMap.get(5000000), 'V\u0305\u0305');
        });

    it('should contain 9000000 to I\u0305\u0305X\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(9000000), true);
            assert.equal(romanMap.get(9000000), 'I\u0305\u0305X\u0305\u0305');
        });

    it('should contain 10000000 to X\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(10000000), true);
            assert.equal(romanMap.get(10000000), 'X\u0305\u0305');
        });

    it('should contain 40000000 to X\u0305\u0305L\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(40000000), true);
            assert.equal(romanMap.get(40000000), 'X\u0305\u0305L\u0305\u0305');
        });

    it('should contain 50000000 to L\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(50000000), true);
            assert.equal(romanMap.get(50000000), 'L\u0305\u0305');
        });

    it('should contain 90000000 to X\u0305\u0305C\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(90000000), true);
            assert.equal(romanMap.get(90000000), 'X\u0305\u0305C\u0305\u0305');
        });

    it('should contain 100000000 to C\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(100000000), true);
            assert.equal(romanMap.get(100000000), 'C\u0305\u0305');
        });
        
    it('should contain 400000000 to C\u0305\u0305D\u0305\u0305', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(400000000), true);
            assert.equal(romanMap.get(400000000), 'C\u0305\u0305D\u0305\u0305');
        });

    it('should contain 500000000 to D\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(500000000), true);
            assert.equal(romanMap.get(500000000), 'D\u0305\u0305');
        });

    it('should contain 900000000 to C\u0305\u0305M\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(900000000), true);
            assert.equal(romanMap.get(900000000), 'C\u0305\u0305M\u0305\u0305');
        });

    it('should contain 1000000000 to M\u0305\u0305 mapping', function () {
            let romanMap = DecimalNumberToRomanMapBuilder.buildNumberToRomanMap(2200000000);
            assert.equal(romanMap.has(1000000000), true);
            assert.equal(romanMap.get(1000000000), 'M\u0305\u0305');
        });
});