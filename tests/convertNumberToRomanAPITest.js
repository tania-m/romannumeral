const request = require('supertest');

describe('Responds to valid routes', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /romannumeral (query = 50)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 50 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'L'
                },
            done);
    });

    it('responds to /romannumeral (query = 149)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 149 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'CXLIX'
                },
            done);
    });

    it('responds to /romannumeral (query = 249)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 249 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'CCXLIX'
                },
            done);
    });

    it('responds to /romannumeral (query = 1606)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 1606 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'MDCVI'
                },
            done);
    });

    it('responds to /romannumeral (query = 3999)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 3999 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'MMMCMXCIX'
                },
            done);
    });

    it('responds to /romannumeral (query = 2200000000)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 2200000000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'M\u0305\u0305M\u0305\u0305C\u0305\u0305C\u0305\u0305'
                },
            done);
    });

    it('responds to /romannumeral (query = 400000000)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 400000000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'C\u0305\u0305D\u0305\u0305'
                },
            done);
    });

    it('responds to /romannumeral (query = 1900400003)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 1900400003 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'M\u0305\u0305C\u0305\u0305M\u0305\u0305C\u0305D\u0305III'
                },
            done);
    });
});

describe('Responds to non existing routes with 404', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /foobar ', function testSlash(done) {
        request(server)
            .get('/foobar')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('responds to /foobarquery ', function testSlash(done) {
        request(server)
            .get('/foobarquery')
            .query({ query: 1900400003 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('responds to / ', function testSlash(done) { // route is not left visible
        request(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('responds to / ', function testSlash(done) { // route is not left visible
        request(server)
            .get('/')
            .query({ query: 1900400003 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});

describe('Responds to edge cases without error', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    it('Parameter sent as string, but still capable to return a response', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: '249' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'CCXLIX'
                },
            done);
    });

    it('Parameter sent as 0249, should be parsed to radix 10', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: '0249' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'CCXLIX'
                },
            done);
    });

    it('Parameter sent as 4/2, truncates the fraction to 4', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: '4/2' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'IV'
                },
            done);
    });

    it('Parameter sent as string, ignore everything except first number', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: '"1;DROP TABLE users"' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                'error': 'NOT_AN_INTEGER',
                'message': 'Parameter is not an integer',
                'apiVersion': '0.2.0'
                },
            done);
    });

    it('Parameter sent as string, fail to process', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: '"1\'; DROP TABLE users-- 1"' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                'error': 'NOT_AN_INTEGER',
                'message': 'Parameter is not an integer',
                'apiVersion': '0.2.0'
                },
            done);
    });
});

describe('Uncapitalizes parts of URL if needed', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /ROMANNUMERAL (query = 249)', function testSlash(done) {
        request(server)
            .get('/ROMANNUMERAL')
            .query({ query: 249 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman' : 'CCXLIX'
                },
            done);
    });

    it('responds to /RoMaNnUmErAl (query = 249)', function testSlash(done) {
        request(server)
            .get('/ROMANNUMERAL')
            .query({ query: 249 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'CCXLIX'
                },
            done);
    });
});

describe('Responds to invalid routes with error', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    it('HPP: Keeps only last parameter of the parameters with same name in query', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 104, query: 249 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                    'roman': 'CCXLIX'
                },
            done);
    });

    it('Responds with an error for empty parameter', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: ' ' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                    'error': 'NOT_AN_INTEGER',
                    'message': 'Parameter is not an integer',
                    'apiVersion': '0.2.0'
                },
            done);
    });

    it('Responds with an error for empty parameter', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: '[a-z]' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                    'error': 'NOT_AN_INTEGER',
                    'message': 'Parameter is not an integer',
                    'apiVersion': '0.2.0'
                },
            done);
    });

    it('Responds with an error for string parameter', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 'a-string' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                    'error': 'NOT_AN_INTEGER',
                    'message': 'Parameter is not an integer',
                    'apiVersion': '0.2.0'
                },
            done);
    });

    it('Responds with an error for value out of range', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 99999999999999 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                    'error': 'OUT_OF_RANGE',
                    'message': 'Parameter is not within range',
                    'apiVersion': '0.2.0'
                },
            done);
    });

    it('Responds with an error for value out of range', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: -1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                    'error': 'OUT_OF_RANGE',
                    'message': 'Parameter is not within range',
                    'apiVersion': '0.2.0'
                },
            done);
    });

    it('Responds with an error for 0 (no 0 in roman notation)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: 0 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                    'error': 'VALUE_IS_ZERO',
                    'message': 'Parameter value is 0, roman numbers do not have a 0',
                    'apiVersion': '0.2.0'
                },
            done);
    });

    it('Responds with an error for 0 as string (no 0 in roman notation)', function testSlash(done) {
        request(server)
            .get('/romannumeral')
            .query({ query: '0' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, {
                    'error': 'VALUE_IS_ZERO',
                    'message': 'Parameter value is 0, roman numbers do not have a 0',
                    'apiVersion': '0.2.0'
                },
            done);
    });
});