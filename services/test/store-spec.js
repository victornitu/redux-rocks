import chai         from 'chai';

import * as l       from '../src/tools/logger';
import * as Store   from '../src/stores/store';

chai.should();

describe('store', () => {
    l.debug('Store specs:');

    it('is a Redux store configured with correct reducer', () => {
        l.debug('is a Redux store configured with correct reducer');

        const store = Store.build();
        store.getState().should.eql({});

        const entries = ['A', 'B'];
        store.dispatch({type: 'INIT', entries});
        store.getState().should.eql({entries});
    });
});