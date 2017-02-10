'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _ramda = require('ramda');

var r = _interopRequireWildcard(_ramda);

var _core = require('../actions/core');

var a = _interopRequireWildcard(_core);

var _logger = require('../tools/logger');

var l = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : a.INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
        case 'INIT':
            l.debug('Reducer: handle Init');
            return a.init(action.entries, state);
        case 'PICK':
            l.debug('Reducer: handle Pick');
            return a.pick(state);
        case 'VOTE':
            l.debug('Reducer: handle Vote');
            return r.pipe(r.propOr({}, 'vote'), a.vote(action.entry), r.assoc('vote', r.__, state))(state);
        default:
            l.debug('Reducer: handle Unknown action');
            return state;
    }
}