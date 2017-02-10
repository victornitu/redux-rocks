import chai     from 'chai';
import * as r   from 'ramda';

import * as a   from 'actions/core';
import * as l   from 'tools/logger';

chai.should();

describe('Application logic', () => {
    l.debug('Core specs:');

    describe('** init **', () => {
        const state = {};
        const entries = ['A', 'B'];
        const result = {entries};

        it('adds the entries to the state', () => {
            l.debug('Test ** init ** add');
            a.init(entries, state).should.eql(result);
        });

        it('adds the entries to the state (curry)', () => {
            l.debug('Test ** init ** add (curry)');
            a.init(entries)(state).should.eql(result);
        });
    });

    describe('** pick **', () => {
        const entries = ['A', 'B', 'a'];

        it('takes the next two entries under vote', () => {
            l.debug('Test ** pick ** next 2');
            const pair = r.pair('A', 'B');
            const state = {entries};
            a.pick(state).should.eql({
                vote: {pair},
                entries: ['a']
            });
        });

        it('puts winner of current vote back to entries', () => {
            l.debug('Test ** pick ** puts current winner');
            const pair = r.pair('D', 'E');
            const tally = r.zipObj(pair, r.pair(4, 2));
            const state = {
                vote: {pair, tally},
                entries
            };
            a.pick(state).should.eql({
                vote: {
                    pair: r.pair('A', 'B')
                },
                entries: ['a', 'D']
            });
        });

        it('puts both from tied vote back to entries', () => {
            l.debug('Test ** pick ** puts both from tied');
            const pair = r.pair('D', 'E');
            const tally = r.zipObj(pair, r.pair(3, 3));
            const state = {
                vote: {pair, tally},
                entries
            };
            a.pick(state).should.eql({
                vote: {
                    pair: r.pair('A', 'B')
                },
                entries: ['a', 'D', 'E']
            });
        });

        it('marks winner when just one entry left', () => {
            l.debug('Test ** pick ** marks winner');
            const pair = r.pair('A', 'B');
            const tally = r.zipObj(pair, r.pair(4, 2));
            const state = {
                vote: {pair, tally},
                entries: []
            };
            a.pick(state).should.eql({
                winner: 'A'
            });
        });
    });

    describe('** vote **', () => {
        const pair = r.pair('A', 'B');
        const tally = {'A': 1};
        const state = { pair };

        it('creates a tally for the voted entry', () => {
            l.debug('Test ** vote ** create tally');
            a.vote('A', state).should.eql({ pair, tally});
        });

        it('creates a tally for the voted entry (curry)', () => {
            l.debug('Test ** vote ** create tally (curry)');
            a.vote('A')(state).should.eql({ pair, tally});
        });

        const before = r.zipObj(pair, r.pair(3, 2));
        const after = r.zipObj(pair, r.pair(4, 2));
        const state1 = {pair, tally: before};
        const state2 = {pair, tally: after};

        it('adds to existing tally for the voted entry', () => {
            l.debug('Test ** vote ** add existing tally');
            a.vote('A', state1).should.eql(state2);
        });

        it('adds to existing tally for the voted entry (curry)', () => {
            l.debug('Test ** vote ** add existing tally (curry)');
            a.vote('A')(state1).should.eql(state2);
        });
    });
});
