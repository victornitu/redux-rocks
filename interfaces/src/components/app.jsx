import * as r   from 'ramda';
import React    from 'react';

export default class App extends React.Component {

    render() {
        const pair = r.pair('JavaScript', 'Scala');
        const tally = r.zipObj(pair, r.pair(5, 4));
        return React.cloneElement(this.props.children, {pair, tally});
    }
}
