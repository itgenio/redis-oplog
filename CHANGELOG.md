## CHANGELOG

### 2.0.7

- export `VentClient`
- add `connection` arg to `VentClient` constructor. Default: `Meteor.connection`

### 2.0.6

- updated meteor version to 1.10+
- replaced unused `overridePublishFunction` key in config by `extendMongoCollection` to enable extending mongo collection. By default: `true`.
- added EJSON parser for Vent's field `VentConstants.EVENT_VARIABLE` (because DDP.parse only handle internal fields like `'fields', 'params', 'result'`)
- added ESLint + Prettier

-----

### 1.2.3
- Redis connection failover handling
- Refetching the up to date collection when Redis connection resumes
- Bug fixes and improvements

### 1.2.2
- Ability to merge db requests by channel
- Bug fixes and improvements

### 1.2.1
- Bug fixes and improvements

### 1.2.0
- Optimistic UI fixes
- Performance gains for methods
- Fixes for publishComposite
- Other bugs and code quality improvements

### 1.0.5 - 1.0.15
- Bug fixes and improvements

### 1.0.5
- Fix for infinite loop when overriding publish

### 1.0.4
- Fix for update using positional operators

### 1.0.3
- Added support for publish composite
- Fixed randomly failing tests