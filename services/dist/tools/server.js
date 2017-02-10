'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = start;

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _logger = require('./logger');

var l = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(port, store) {
    var io = new _socket2.default().attach(port);
    l.success('Server: listening on port ', port);

    store.subscribe(function () {
        return io.emit('state', store.getState());
    });

    io.on('connection', function (socket) {
        socket.emit('state', store.getState());
        socket.on('action', store.dispatch.bind(store));
    });
}