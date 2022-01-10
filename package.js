Package.describe({
  name: 'itgenio:redis-oplog',
  version: '2.0.7',
  // Brief, one-line summary of the package.
  summary: "Replacement for Meteor's MongoDB oplog implementation",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/itgenio/redis-oplog',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Npm.depends({
  redis: '2.8.0',
  'deep-extend': '0.5.0',
  'lodash.clonedeep': '4.5.0',
});

// eslint-disable-next-line prefer-arrow-callback
Package.onUse(function (api) {
  api.versionsFrom('1.10');
  api.use([
    'underscore',
    'ecmascript',
    'ejson',
    'minimongo',
    'mongo',
    'random',
    'ddp-server',
    'diff-sequence',
    'id-map',
    'mongo-id',
    'tracker',
  ]);

  api.mainModule('redis-oplog.js', 'server');
  api.mainModule('redis-oplog.client.js', 'client');
});

// eslint-disable-next-line prefer-arrow-callback
Package.onTest(function (api) {
  api.use('cultofcoders:redis-oplog');

  api.use('ecmascript');
  api.use('tracker');
  api.use('mongo');
  api.use('random');
  api.use('accounts-password');
  api.use('matb33:collection-hooks');
  api.use('alanning:roles@1.2.19');

  api.use(['meteortesting:mocha']);

  api.mainModule('testing/main.server.js', 'server');
  api.addFiles('testing/optimistic-ui/boot.js', 'server');

  api.mainModule('testing/main.client.js', 'client');
});
