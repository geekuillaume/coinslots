/**
 * Coinslot model events
 */

'use strict';

import {EventEmitter} from 'events';
var Coinslot = require('../../sqldb').Coinslot;
var CoinslotEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CoinslotEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Coinslot.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CoinslotEvents.emit(event + ':' + doc._id, doc);
    CoinslotEvents.emit(event, doc);
    done(null);
  }
}

export default CoinslotEvents;
