import chai                             from 'chai';
import chaiEnzyme                       from 'chai-enzyme';
import {mount}                          from 'enzyme'
import * as r                           from 'ramda';
import React                            from 'react';

import {PureResults}                    from 'components/results';

chai.use(chaiEnzyme());
chai.should();

describe('Results', () => {
    const pair = r.pair('A', 'B');
    const choice = pair[0];

    it('renders entries with vote counts or zero', () => {
        const tally = {'A': 3};
        const component = mount(
            <PureResults pair={pair} tally={tally} />
        );
        component.should.have.exactly(2).descendants('.entry');
        component.find('.entry').at(0).should.contain.text('A');
        component.find('.entry').at(0).should.contain.text('3');
        component.find('.entry').at(1).should.contain.text('B');
        component.find('.entry').at(1).should.contain.text('0');
    });

    it('invokes the pick action when pick button is clicked', () => {
        let picked = false;
        const pick = () => picked = true;
        const component = mount(
            <PureResults pair={pair} tally={{}} pick={pick} />
        );
        component.find('button').at(0).simulate('click');
        picked.should.equal(true);
    });

    it('renders the winner when there is one', () => {
        const component = mount(
           <PureResults winner={choice} pair={pair} tally={{}} />
       );
        component.should.not.have.descendants('button');
        component.should.have.exactly(1).descendants('.winner');
        component.find('.winner').should.contain.text(pair[0]);
    });
});
