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
      // avoid parsing unnecessary ddp events
      const search = `{"msg":"changed","${VentConstants.PREFIX}":"1`;
      if (rawMsg.substr(0, search.length) !== search) {
        return;
      }

      const msg = DDPCommon.parseDDP(rawMsg);
      const subscription = this.store[msg.id];
      if (subscription) {
        // apply EJSON (v2.0.6)
        // https://github.com/meteor/meteor/blob/3ae22ca82096e500c4c29f8eba0799e55d428bd0/packages/ddp-common/utils.js#L70
        subscription.handle(
          EJSON.fromJSONValue(msg[VentConstants.EVENT_VARIABLE])
        );
      }
    });
  }

  /**
   * @param {VentClientSubscription} subscription
   */
  add(subscription) {
    this.store[subscription.id] = subscription;
  }

  /**
   * @param {VentClientSubscription} subscription
   */
  remove(subscription) {
    delete this.store[subscription.id];
  }
}
