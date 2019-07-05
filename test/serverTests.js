"use strict";

const request = require('supertest');

describe('Loading express', function () {
    let server;
    let apiVersion = process.env.API_VERSION || '1.0.0';

    beforeEach(function () {
        delete require.cache[require.resolve('./../server')];
        server = require('./../server.js');
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('responds to /version', function testPath(done) {
        request(server)
            .get('/version')
            .expect(200, {
                    'version': apiVersion
                },
            done);
    });

    it('responds to /heartbeat', function testPath(done) {
        request(server)
            .get('/heartbeat')
            .expect(200, done);
    });

    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });

    it('404 if direct root access', function testPath(done) {
        request(server)
            .get('/')
            .expect(404, done); 
    });

    it('404 if direct root access', function testPath(done) {
        request(server)
            .get('/')
            .expect(404, done); 
    });

    it('404 romannumeral typo in URL', function testPath(done) {
        request(server)
            .get('/romaumeral')
            .expect(404, done);
    });
});