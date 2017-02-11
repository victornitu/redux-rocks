import * as r   from 'ramda';
import React    from 'react';
import {Button} from 'react-toolbox/lib/button';
import {
    Card
}               from 'react-toolbox/lib/card';
import {
    List,
    ListItem
}               from 'react-toolbox/lib/list';

import Winner   from './winner';

export default class Results extends React.PureComponent {

    render() {
        const {winner} = this.props;
        if(winner) {
            return <Winner ref="winner" winner={winner} />
        }
        const pair = r.propOr([], 'pair', this.props);
        const tally = r.propOr({}, 'tally', this.props);
        const action = r.propOr(doNothing, 'pick', this.props);
        return (
            <Card className="results">
                <List className="tally">
                    {pair.map(e => <Entry key={e} entry={e} tally={tally} />)}
                </List>
                <Button floating icon="check" onClick={action} ref="pick" className="pick" />
            </Card>
        );
    }
}

function doNothing() {
    console.log('No action specified in Results component');
}

class Entry extends React.PureComponent {

    render() {
        const {entry, tally} = this.props;
        const vote = r.propOr(0, entry, tally);
        const legend = `Number of votes = ${vote}`;
        return (
            <ListItem className="entry" caption={entry} legend={legend} />
        );
    }
}
