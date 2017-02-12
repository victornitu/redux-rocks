import chai     from 'chai';
import * as r   from 'ramda';

import * as l   from 'tools/logger';
import reducer  from 'stores/reducer';

chai.should();

describe('reducer', () => {
    l.debug('Reducer specs:');

    it('has an initial state', () => {
        l.debug('has an initial state');

        const entries = ['A'];
        const action = {type: 'INIT', entries};

        reducer(undefined, action).should.eql({entries});
    });

    it('handles INIT', () => {
        l.debug('handles INIT');

        const entries = ['A'];
        const state = {};
        const action = {type: 'INIT', entries};

        reducer(state, action).should.eql({entries});
    });

    it('handles PICK', () => {
        l.debug('handles PICK');

        const entries = r.pair('A', 'B');
        const state = {entries};
        const action = {type: 'PICK'};

        reducer(state, action).should.eql({
            vote: {pair: entries},
            entries: []
        });
    });

    it('handles VOTE', () => {
        l.debug('handles VOTE');

        const entries = r.pair('A', 'B');
        const state = {
            vote: {pair: entries},
            entries: []
        };
        const action = {type: 'VOTE', entry: 'A'};

        reducer(state, action).should.eql({
            vote: {
                pair: entries,
                tally: {'A': 1}
            },
            entries: []
        });
    });

    it('can be used with reduce', () => {
        l.debug('can be used with reduce');

        const actions = [
            {type: 'INIT', entries: ['A', 'B']},
            {type: 'PICK'},
            {type: 'VOTE', entry: 'A'},
            {type: 'VOTE', entry: 'B'},
            {type: 'VOTE', entry: 'A'},
            {type: 'PICK'}
        ];
        const run = r.reduce(reducer, {});

        run(actions).should.eql({
            winner: 'A'
        });
    });
});
