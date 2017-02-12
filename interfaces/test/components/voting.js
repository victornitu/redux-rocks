import chai                             from 'chai';
import chaiEnzyme                       from 'chai-enzyme';
import {mount}                          from 'enzyme'
import * as r                           from 'ramda';
import React                            from 'react';

import {PureVoting}                     from 'components/voting';

chai.use(chaiEnzyme());
chai.should();

describe('Voting', () => {
    const pair = r.pair('A', 'B');
    const choice = pair[0];

    it('renders s pair of buttons', () => {
        const component = mount(
            <PureVoting pair={pair} />
        );
        component.should.have.exactly(2).descendants('button');
        component.find('button').at(0).html().match(/A/);
        component.find('button').at(1).html().match(/B/);
    });

    it('invokes callback when button is clicked', () => {
        let choice = 'None';
        const vote = entry => choice = entry;
        const component = mount(
            <PureVoting pair={pair} vote={vote} />
        );
        component.find('button').at(0).simulate('click');
        choice.should.equal(pair[0]);
    });

    it('disables buttons when user has voted', () => {
        const component = mount(
            <PureVoting pair={pair} choice={choice} />
        );
        component.should.have.exactly(2).descendants('button');
        component.find('button').at(0).should.be.disabled();
        component.find('button').at(1).should.be.disabled();
    });

    it('set icon of the voted entry to selected', () => {
        const component = mount(
            <PureVoting pair={pair} choice={choice} />
        );
        component.should.have.exactly(2).descendants('.material-icons');
        component.find('.material-icons').at(0).should.have.text('favorite');
        component.find('.material-icons').at(1).should.have.text('favorite_border');
    });

    it('renders just the winner when there is one', () => {
        const component = mount(
            <PureVoting winner={choice} pair={pair} />
        );
        component.should.not.have.descendants('button');
        component.should.have.exactly(1).descendants('.winner');
        component.find('.winner').should.contain.text(pair[0]);
    });
});
