'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = undefined;

var _ramda = require('ramda');

var r = _interopRequireWildcard(_ramda);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _store = require('./stores/store');

var Store = _interopRequireWildcard(_store);

var _server = require('./tools/server');

var Server = _interopRequireWildcard(_server);

var _logger = require('./tools/logger');

var l = _interopRequireWildcard(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

l.info('Start application');

var defaultPort = _config2.default.get('server.port');
var port = r.propOr(defaultPort, 2, process.argv);

var store = exports.store = Store.build();
l.info('Store build');

Server.start(port, store);
l.info('Server started');

store.dispatch({
    type: 'INIT',
    entries: require('./../data/entries.json')
});
l.info('Data bootstrapped');

store.dispatch({ type: 'PICK' });
l.info('First pick done');