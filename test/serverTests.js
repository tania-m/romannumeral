var request = require('supertest');

describe('Loading express', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /version', function testSlash(done) {
        // tests will not set ENV variables, so version defaults to 'unknown'
        request(server)
            .get('/version')
            .expect(200, {
                    'version': 'unknown'
                },
            done);
    });

    it('responds to /heartbeat', function testSlash(done) {
        request(server)
            .get('/heartbeat')
            .expect(200, done);
    });

    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});