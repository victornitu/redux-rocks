import chai                             from 'chai';
import * as r                           from 'ramda';
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
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

    it('invokes the pick action when pick button is clicked', () => {
        let picked = false;
        const pick = () => picked = true;

        const pair = r.pair('A', 'B');
        const component = renderIntoDocument(
            <Results pair={pair} tally={{}} pick={pick} />
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.pick));

        picked.should.equal(true);
    });

    it('renders the winner when there is one', () => {
        const pair = r.pair('A', 'B');
        const component = renderIntoDocument(
           <Results winner={pair[0]} pair={pair} tally={{}} />
       );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        winner.should.be.ok;
        winner.textContent.should.contain(pair[0]);
    });
});
