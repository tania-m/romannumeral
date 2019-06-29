var request = require('supertest');

describe('Loading express', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
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