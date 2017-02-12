import * as r   from 'ramda';

import * as l   from 'tools/logger';

const entriesLens = r.lensProp('entries');

export const INITIAL_STATE = {};

export function init(entries, state = r.__) {
    l.debug('Core: Initialize entries');
    return r.set(entriesLens, entries, state);
}

export function pick(state) {
    const {vote, entries, pair} = next(state);
    const isSingle = r.pipe(r.length, r.equals(1));
    if(r.and(isSingle(entries), r.isEmpty(pair))) {
        l.debug('Core: We have s winner!');
        return result(r.head(entries))(state);
    }
    l.debug('Core: Pick next pair');
    return r.merge(state, {vote, entries});
}

function next(state) {
    const entries = r.view(entriesLens, state);
    const pair = r.take(2, entries);
    const rest = r.drop(2, entries);
    const winners = findWinners(state);
    return {
        pair,
        vote: {pair},
        entries: r.concat(rest, winners)
    };
}

function findWinners(state) {
    const tally = r.pathOr({}, ['vote', 'tally'], state);
    const scores = r.invert(tally);
    return r.pipe(
        r.values,
        r.reduce(r.max, 0),
        r.propOr([], r.__, scores)
    )(tally);
}

function result(winner) {
    return r.pipe(
        r.dissoc('entries'),
        r.dissoc('vote'),
        r.assoc('winner', winner)
    );
}

export function vote(entry, state = r.__) {
    l.debug('Core: Vote for entry ', entry);
    const path = ['tally', entry];
    const entryLens = r.lensPath(path);
    return r.ifElse(
        r.pathSatisfies(r.isNil, path),
        r.set(entryLens, 1),
        r.over(entryLens, r.inc)
    )(state);
}
