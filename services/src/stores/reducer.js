import * as r   from 'ramda';

import * as s   from 'services/core';
import * as l   from 'tools/logger';

export default function reducer(state = s.INITIAL_STATE, action) {
    switch (action.type) {
    case 'INIT':
        l.debug('Reducer: handle Init');
        return s.init(action.entries, state);
    case 'PICK':
        l.debug('Reducer: handle Pick');
        return s.pick(state);
    case 'VOTE':
        l.debug('Reducer: handle Vote');
        return r.pipe(
            r.propOr({}, 'vote'),
            s.vote(action.entry),
            r.assoc('vote', r.__, state)
        )(state);
    default:
        l.debug('Reducer: handle Unknown action');
        return state;
    }
}
