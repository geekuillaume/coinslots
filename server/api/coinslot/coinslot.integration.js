'use strict';

var app = require('../..');
import request from 'supertest';

var newCoinslot;

describe('Coinslot API:', function() {

  describe('GET /api/coinslots', function() {
    var coinslots;

    beforeEach(function(done) {
      request(app)
        .get('/api/coinslots')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          coinslots = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      coinslots.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/coinslots', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/coinslots')
        .send({
          name: 'New Coinslot',
          info: 'This is the brand new coinslot!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCoinslot = res.body;
          done();
        });
    });

    it('should respond with the newly created coinslot', function() {
      newCoinslot.name.should.equal('New Coinslot');
      newCoinslot.info.should.equal('This is the brand new coinslot!!!');
    });

  });

  describe('GET /api/coinslots/:id', function() {
    var coinslot;

    beforeEach(function(done) {
      request(app)
        .get('/api/coinslots/' + newCoinslot._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          coinslot = res.body;
          done();
        });
    });

    afterEach(function() {
      coinslot = {};
    });

    it('should respond with the requested coinslot', function() {
      coinslot.name.should.equal('New Coinslot');
      coinslot.info.should.equal('This is the brand new coinslot!!!');
    });

  });

  describe('PUT /api/coinslots/:id', function() {
    var updatedCoinslot;

    beforeEach(function(done) {
      request(app)
        .put('/api/coinslots/' + newCoinslot._id)
        .send({
          name: 'Updated Coinslot',
          info: 'This is the updated coinslot!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCoinslot = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCoinslot = {};
    });

    it('should respond with the updated coinslot', function() {
      updatedCoinslot.name.should.equal('Updated Coinslot');
      updatedCoinslot.info.should.equal('This is the updated coinslot!!!');
    });

  });

  describe('DELETE /api/coinslots/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/coinslots/' + newCoinslot._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when coinslot does not exist', function(done) {
      request(app)
        .delete('/api/coinslots/' + newCoinslot._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
