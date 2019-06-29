var request = require('supertest');

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

/*describe('Responds to invalid routes with error', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });
});*/