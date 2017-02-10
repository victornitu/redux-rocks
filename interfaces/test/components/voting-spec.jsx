import chai                             from 'chai';
import * as R                           from 'ramda';
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
}                                       from 'react-addons-test-utils';

import Voting                           from '../../src/components/voting';

chai.should();

describe('Voting', () => {
    const pair = R.pair('A', 'B');
    const choice = pair[0];

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={pair}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        buttons.length.should.equal(pair.length);
        buttons[0].textContent.should.contain(pair[0]);
        buttons[1].textContent.should.contain(pair[1]);
    });

    it('invokes callback when button is clicked', () => {
        let choice = 'None';
        const vote = entry => choice = entry;

        const component = renderIntoDocument(
            <Voting pair={pair} vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        choice.should.equal(pair[0]);
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={pair} choice={choice}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        buttons.length.should.equal(pair.length);
        buttons[0].hasAttribute('disabled').should.equal(true);
        buttons[1].hasAttribute('disabled').should.equal(true);
    });

    it('set icon of the voted entry to selected', () => {
        const component = renderIntoDocument(
            <Voting pair={pair} choice={choice}/>
        );
        const icons = scryRenderedDOMComponentsWithClass(component, 'material-icons');

        icons[0].textContent.should.equal('favorite');
        icons[1].textContent.should.equal('favorite_border');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner={choice}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        buttons.length.should.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        (() => winner.should.be.ok)();
        winner.textContent.should.contain(pair[0]);
    });
});