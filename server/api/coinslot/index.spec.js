'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var coinslotCtrlStub = {
  index: 'coinslotCtrl.index',
  show: 'coinslotCtrl.show',
  create: 'coinslotCtrl.create',
  update: 'coinslotCtrl.update',
  destroy: 'coinslotCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var coinslotIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './coinslot.controller': coinslotCtrlStub
});

describe('Coinslot API Router:', function() {

  it('should return an express router instance', function() {
    coinslotIndex.should.equal(routerStub);
  });

  describe('GET /api/coinslots', function() {

    it('should route to coinslot.controller.index', function() {
      routerStub.get
        .withArgs('/', 'coinslotCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/coinslots/:id', function() {

    it('should route to coinslot.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'coinslotCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/coinslots', function() {

    it('should route to coinslot.controller.create', function() {
      routerStub.post
        .withArgs('/', 'coinslotCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/coinslots/:id', function() {

    it('should route to coinslot.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'coinslotCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/coinslots/:id', function() {

    it('should route to coinslot.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'coinslotCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/coinslots/:id', function() {

    it('should route to coinslot.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'coinslotCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
