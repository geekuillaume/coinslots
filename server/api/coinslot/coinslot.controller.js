/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/coinslots              ->  index
 * POST    /api/coinslots              ->  create
 * GET     /api/coinslots/:id          ->  show
 * PUT     /api/coinslots/:id          ->  update
 * DELETE  /api/coinslots/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Coinslot} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Coinslots
export function index(req, res) {
  return Coinslot.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Coinslot from the DB
export function show(req, res) {
  return Coinslot.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Coinslot in the DB
export function create(req, res) {
  return Coinslot.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Coinslot in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Coinslot.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Coinslot from the DB
export function destroy(req, res) {
  return Coinslot.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
