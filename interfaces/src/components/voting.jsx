import * as r   from 'ramda';
import React    from 'react';
import {Button} from 'react-toolbox/lib/button';
import {
    Card,
    CardText,
    CardActions
}               from 'react-toolbox/lib/card';
import FontIcon from 'react-toolbox/lib/font_icon';

import Winner   from './winner';

export default class Voting extends React.PureComponent {

    render() {
        const {winner, pair, choice, vote} = this.props;
        if (winner) {
            return <Winner ref="winner" winner={winner}/>;
        }
        return <Entries pair={pair} choice={choice} vote={vote}/>;
    }
}

class Entries extends React.PureComponent {

    render() {
        const {choice, vote} = this.props;
        const pair = r.propOr([], 'pair', this.props);
        return (
            <Card>
                <CardText>Vote for your favorite!</CardText>
                <CardActions>
                    {pair.map(e => <Entry key={e} entry={e} choice={choice} vote={vote} />)}
                </CardActions>
            </Card>
        );
    }
}

class Entry extends React.PureComponent {

    render() {
        const {entry, choice} = this.props;
        const action = r.propOr(doNothing, 'vote', this.props);
        const selected = r.equals(entry, choice);
        const icon = selected ? 'favorite' : 'favorite_border';
        return (
            <Button
                label={entry}
                disabled={!!choice}
                onClick={() => action(entry)}>

                <FontIcon value={icon}/>
            </Button>
        );
    }
}

function doNothing() {
    console.log('No action specified in Voting component');
}
