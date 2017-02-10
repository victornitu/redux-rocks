'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INITIAL_STATE = undefined;
exports.init = init;
exports.pick = pick;
exports.vote = vote;

var _ramda = require('ramda');

var r = _interopRequireWildcard(_ramda);

var _logger = require('../tools/logger');

var l = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var entriesLens = r.lensProp('entries');

var INITIAL_STATE = exports.INITIAL_STATE = {};

function init(entries) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : r.__;

    l.debug('Core: Initialize entries');
    return r.set(entriesLens, entries, state);
}

function pick(state) {
    var _next = next(state),
        vote = _next.vote,
        entries = _next.entries,
        pair = _next.pair;

    var isSingle = r.pipe(r.length, r.equals(1));
    if (r.and(isSingle(entries), r.isEmpty(pair))) {
        l.debug('Core: We have a winner!');
        return result(r.head(entries))(state);
    }
    l.debug('Core: Pick next pair');
    return r.merge(state, { vote: vote, entries: entries });
}

function next(state) {
    var entries = r.view(entriesLens, state);
    var pair = r.take(2, entries);
    var rest = r.drop(2, entries);
    var winners = findWinners(state);
    return {
        pair: pair,
        vote: { pair: pair },
        entries: r.concat(rest, winners)
    };
}

function findWinners(state) {
    var tally = r.pathOr({}, ['vote', 'tally'], state);
    var scores = r.invert(tally);
    return r.pipe(r.values, r.reduce(r.max, 0), r.propOr([], r.__, scores))(tally);
}

function result(winner) {
    return r.pipe(r.dissoc('entries'), r.dissoc('vote'), r.assoc('winner', winner));
}

function vote(entry) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : r.__;

    l.debug('Core: Vote for entry ', entry);
    var path = ['tally', entry];
    var entryLens = r.lensPath(path);
    return r.ifElse(r.pathSatisfies(r.isNil, path), r.set(entryLens, 1), r.over(entryLens, r.inc))(state);
}