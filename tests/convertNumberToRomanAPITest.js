var request = require('supertest');

describe('Loading express', function () {
    var server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /health', function testSlash(done) {
        request(server)
            .get('/health')
            .expect(200, done);
    });
});