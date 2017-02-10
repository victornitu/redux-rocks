import * as R           from 'ramda';
import React            from 'react';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import {
    Card,
    CardTitle,
    CardText,
    CardActions
}                       from 'react-toolbox/lib/card';
import {Button}         from 'react-toolbox/lib/button';
import FontIcon         from 'react-toolbox/lib/font_icon';

function doNothing() {
    console.log('No action specified in Voting component');
}

export default class Voting extends React.Component {

    constructor(props) {
        super(props);
        this.renderEntry = this.renderEntry.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        if (this.props.winner) {
            return this.renderWinner();
        }
        return this.renderEntries();
    }

    renderWinner() {
        const {winner} = this.props;
        return (
            <Card ref="winner">
                <CardTitle title={`Winner is ${winner}`}/>
            </Card>
        );
    }

    renderEntries() {
        const text = "Vote for your favorite!";
        const pair = R.propOr([], 'pair', this.props);
        return (
            <Card>
                <CardText>{text}</CardText>
                <CardActions>
                    {pair.map(this.renderEntry)}
                </CardActions>
            </Card>
        );
    }

    renderEntry(entry) {
        const hasChosen = !!this.props.choice;
        const action = R.propOr(doNothing, 'vote', this.props);
        const selected = R.propEq('choice', entry, this.props);
        const icon = selected ? 'favorite' : 'favorite_border';
        return (
            <Button
                key={entry}
                label={entry}
                disabled={hasChosen}
                onClick={() => action(entry)}
            >
                <FontIcon value={icon}/>
            </Button>
        );
    }
}