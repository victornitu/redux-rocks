import chai                             from 'chai';
import * as r                           from 'ramda';
import React                            from 'react';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass
}                                       from 'react-addons-test-utils';

import Results                          from '../../src/components/results';

chai.should();

describe('Results', () => {

    it('renders entries with vote counts or zero', () => {
        const pair = r.pair('A', 'B');
        const tally = {'A': 3};
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally}/>
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [a, b] = entries.map(e => e.textContent);

        entries.length.should.equal(2);
        a.should.contain('A');
        a.should.contain('3');
        b.should.contain('B');
        b.should.contain('0');
    });
});
