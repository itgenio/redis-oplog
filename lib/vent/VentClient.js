import { DDPCommon } from 'meteor/ddp-common';
import { EJSON } from 'meteor/ejson';
import { Meteor } from 'meteor/meteor';
import { VentConstants } from '../constants';
import { VentClientSubscription } from './ventClientSubscription';

/**
 * Handles vents inside Meteor
 */
export default class VentClient {
  constructor(connection) {
    this.connection = connection ?? Meteor.connection;
    this.store = {};
    this.listen(this.connection);
  }

  subscribe(name, ...args) {
    const subscription = new VentClientSubscription(this, name);
    this.add(subscription);

    return subscription.subscribe(...args);
  }

  listen(ddpConnection) {
    ddpConnection._stream.on('message', rawMsg => {
      const search = `{"msg":"changed","${VentConstants.PREFIX}":"1`;
      if (rawMsg.substr(0, search.length) !== search) {
        return;
      }

      const msg = DDPCommon.parseDDP(rawMsg);
      const subscription = this.store[msg.id];
      if (subscription) {
        subscription.handle(
          EJSON.fromJSONValue(msg[VentConstants.EVENT_VARIABLE])
        );
      }
    });
  }

  add(subscription) {
    this.store[subscription.id] = subscription;
  }

  remove(subscription) {
    delete this.store[subscription.id];
  }
}
