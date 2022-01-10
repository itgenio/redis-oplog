import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { VentConstants } from '../constants';

/**
 * Handles Vent subscription
 */
export class VentClientSubscription {
  constructor(client, name) {
    this.client = client;
    this._name = name;
    this._id = Random.id();
  }

  get id() {
    return VentConstants.getPrefix(this._id, this._name);
  }

  /**
   * Subscribes to Meteor
   *
   * @param args
   * @returns {*}
   */
  subscribe(...args) {
    const self = this;

    const handler = this.client.connection.subscribe(
      this._name,
      this._id,
      ...args
    );

    const oldStop = handler.stop;
    Object.assign(handler, {
      listen(eventHandler) {
        if (!_.isFunction(eventHandler)) {
          throw new Meteor.Error(
            'invalid-argument',
            'You should pass a function to listen()'
          );
        }

        self._eventHandler = eventHandler;
      },
      stop() {
        self.client.remove(self);

        return oldStop.call(handler);
      },
    });

    return handler;
  }

  /**
   * Watches the incomming events
   */
  handle(event) {
    if (this._eventHandler) {
      this._eventHandler(event);
    }
  }
}
