import * as r   from 'ramda';

import * as a   from 'actions/core';
import * as l   from 'tools/logger';

export default function reducer(state = a.INITIAL_STATE, action) {
    switch (action.type) {
    case 'INIT':
        l.debug('Reducer: handle Init');
        return a.init(action.entries, state);
    case 'PICK':
        l.debug('Reducer: handle Pick');
        return a.pick(state);
    case 'VOTE':
        l.debug('Reducer: handle Vote');
        return r.pipe(
            r.propOr({}, 'vote'),
            a.vote(action.entry),
            r.assoc('vote', r.__, state)
        )(state);
    default:
        l.debug('Reducer: handle Unknown action');
        return state;
    }
}