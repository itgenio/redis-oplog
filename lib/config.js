/**
 * In-Memory configuration storage
 */
let Config = {
  isInitialized: false,
  debug: false,
  extendMongoCollection: true,
  mutationDefaults: {
    pushToRedis: true,
    optimistic: true,
  },
  passConfigDown: false,
  redis: {
    port: 6379,
    host: '127.0.0.1',
  },
  globalRedisPrefix: '',
  retryIntervalMs: 10000,
  externalRedisPublisher: false,
  redisExtras: {
    // eslint-disable-next-line camelcase
    retry_strategy() {
      return Config.retryIntervalMs;
    },
    events: {
      end() {
        console.error('RedisOplog - Connection to redis ended');
      },
      error(err) {
        console.error('RedisOplog - An error occured: \n', JSON.stringify(err));
      },
      connect(err) {
        if (!err) {
          console.log('RedisOplog - Established connection to redis.');
        } else {
          console.error(
            'RedisOplog - There was an error when connecting to redis',
            JSON.stringify(err)
          );
        }
      },
      reconnecting(err) {
        if (err) {
          console.error(
            'RedisOplog - There was an error when re-connecting to redis',
            JSON.stringify(err)
          );
        }
      },
    },
  },
};

export default Config;
