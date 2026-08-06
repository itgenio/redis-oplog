Package.describe({
  name: 'itgenio:redis-oplog',
  version: '3.0.1',
  // Brief, one-line summary of the package.
  summary: "Replacement for Meteor's MongoDB oplog implementation",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/itgenio/redis-oplog',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Npm.depends({
  redis: '3.1.2',
  'deep-extend': '0.6.0',
  'lodash.clonedeep': '4.5.0',
});

// eslint-disable-next-line prefer-arrow-callback
Package.onUse(function (api) {
  api.versionsFrom('METEOR@3.5');
  api.use([
    'underscore@1.6.4',
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
  api.use('itgenio:redis-oplog');

  api.use('ecmascript');
  api.use('tracker');
  api.use('mongo');
  api.use('random');
  api.use('accounts-password');
  api.use('matb33:collection-hooks@2.0.0');
  api.use('roles');

  api.use('ddp-server');
  api.use('ejson');
  api.use('reywood:publish-composite@1.9.0');
  api.use('meteortesting:mocha');

  api.mainModule('testing/main.server.js', 'server');
  api.addFiles('testing/publishComposite/boot.js', 'server');
  api.addFiles('testing/optimistic-ui/boot.js', 'server');

  api.mainModule('testing/main.client.js', 'client');
});
