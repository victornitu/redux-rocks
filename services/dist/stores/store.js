'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.build = build;

var _redux = require('redux');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function build() {
    return (0, _redux.createStore)(_reducer2.default);
}