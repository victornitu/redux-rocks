'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.info = info;
exports.success = success;
exports.debug = debug;
exports.warn = warn;
exports.error = error;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_winston2.default.level = _config2.default.get('log.level');

function now() {
    return new Date().toLocaleString();
}

function print(level, style, message) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
    }

    _winston2.default.log.apply(_winston2.default, [level, _chalk2.default.underline.black(now() + ':'), style(message)].concat(args));
}

function info(message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    print.apply(undefined, ['info', _chalk2.default.blue, message].concat(args));
}

function success(message) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    print.apply(undefined, ['info', _chalk2.default.green.bold, message].concat(args));
}

function debug(message) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
    }

    print.apply(undefined, ['debug', _chalk2.default.cyan.bold, message].concat(args));
}

function warn(message) {
    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
    }

    print.apply(undefined, ['warn', _chalk2.default.yellow, message].concat(args));
}

function error(message) {
    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
    }

    print.apply(undefined, ['error', _chalk2.default.red.bold, message].concat(args));
}