import * as r   from 'ramda';
import React    from 'react';
import {
    List,
    ListItem
}               from 'react-toolbox/lib/list';

export default class Results extends React.PureComponent {

    render() {
        const pair = r.propOr([], 'pair', this.props);
        const tally = r.propOr({}, 'tally', this.props);
        return (
            <List>
                {pair.map(e => <Entry key={e} entry={e} tally={tally}/>)}
            </List>
        );
    }
}

class Entry extends React.PureComponent {

    render() {
        const {entry, tally} = this.props;
        const vote = r.propOr(0, entry, tally);
        const legend = `Number of votes = ${vote}`;
        return (
            <ListItem className="entry" caption={entry} legend={legend}/>
        );
    }
}
