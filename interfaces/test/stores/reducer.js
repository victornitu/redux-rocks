import chai     from 'chai';
import * as r   from 'ramda';

import reducer  from 'stores/reducer';

chai.should();

describe('reducer', () => {
    const entries = r.pair('A', 'B');
    const vote = {
        pair: entries,
        tally: {'A': 1}
    };

    it('handles UPDATE', () => {
        const action = {
            type: 'UPDATE',
            state: {vote}
        };

        reducer({}, action).should.eql({vote});
    });

    it('handles UPDATE with old choice', () => {
        const action = {
            type: 'UPDATE',
            state: {vote}
        };
        reducer({choice: 'C'}, action).should.eql({vote});
    });

    it('handles UPDATE with current choice', () => {
        const action = {
            type: 'UPDATE',
            state: {vote}
        };
        reducer({choice: 'A'}, action).should.eql({vote, choice: 'A'});
    });

    it('handles UPDATE without initial state', () => {
        const action = {
            type: 'UPDATE',
            state: {vote}
        };

        reducer(undefined, action).should.eql({vote});
    });

    it('handles VOTE by setting choice', () => {
        const action = {
            type: 'VOTE',
            entry: 'A'
        };
        reducer({vote}, action).should.eql({
            vote,
            choice: 'A'
        });
    });

    it('does not set choice for VOTE on invalid entry', () => {
        const action = {
            type: 'VOTE',
            entry: 'C'
        };
        reducer({vote}, action).should.eql({vote});
    });
});
