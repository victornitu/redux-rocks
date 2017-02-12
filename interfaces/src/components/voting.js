import * as r       from 'ramda';
import React        from 'react';
import {connect}    from 'react-redux';
import {Button}     from 'react-toolbox/lib/button';
import {
    Card,
    CardText,
    CardActions
}                   from 'react-toolbox/lib/card';
import FontIcon     from 'react-toolbox/lib/font_icon';

import Winner       from './winner';
import * as actions from 'stores/actions';

export function PureVoting(props) {
    const {winner, pair, choice, vote} = props;
    if (winner) {
        return <Winner winner={winner}/>;
    }
    return <Entries pair={pair} choice={choice} vote={vote}/>;
}

function Entries(props) {
    const {choice, vote} = props;
    const pair = r.propOr([], 'pair', props);
    return (
        <Card>
            <CardText>Vote for your favorite!</CardText>
            <CardActions>
                {pair.map(e => <Entry key={e} entry={e} choice={choice} vote={vote} />)}
            </CardActions>
        </Card>
    );
}

function Entry(props) {
    const {entry, choice} = props;
    const vote = r.propOr(doNothing, 'vote', props);
    const selected = r.equals(entry, choice);
    const icon = selected ? 'favorite' : 'favorite_border';
    return (
        <Button raised primary
            label={entry}
            disabled={!!choice}
            onClick={() => vote(entry)}>

            <FontIcon value={icon}/>
        </Button>
    );
}

function doNothing() {
    alert('No action specified in Voting component');
}

const Voting = connect((state) => {
    return {
        pair: r.pathOr([], ['vote', 'pair'], state),
        choice: r.prop('choice', state),
        winner: r.prop('winner', state)
    };
}, actions)(PureVoting);

export default Voting;
