import * as r       from 'ramda';
import React        from 'react';
import {connect}    from 'react-redux';
import {Button}     from 'react-toolbox/lib/button';
import {
    Card,
    CardActions
}                   from 'react-toolbox/lib/card';
import {
    List,
    ListItem
}                   from 'react-toolbox/lib/list';

import Winner       from './winner';
import * as actions from 'stores/actions';

export function PureResults(props) {
    const {winner} = props;
    if(winner) {
        return <Winner winner={winner} />
    }
    const pair = r.propOr([], 'pair', props);
    const tally = r.propOr({}, 'tally', props);
    const pick = r.propOr(doNothing, 'pick', props);
    return (
        <Card className="results">
            <List className="tally">
                {pair.map(e => <Entry key={e} entry={e} tally={tally} />)}
            </List>
            <CardActions>
                <Button floating icon="check" onClick={pick} className="pick" />
            </CardActions>
        </Card>
    );
}

function Entry(props) {
    const {entry, tally} = props;
    const vote = r.propOr(0, entry, tally);
    const legend = `Number of votes = ${vote}`;
    return (
        <ListItem className="entry" caption={entry} legend={legend} />
    );
}

function doNothing() {
    alert('No action specified in Results component');
}

const Results = connect((state) => {
    return {
        pair: r.pathOr([], ['vote', 'pair'], state),
        tally: r.pathOr({}, ['vote', 'tally'], state),
        winner: r.prop('winner', state)
    };
}, actions)(PureResults);

export default Results;
