import * as R           from 'ramda';
import React            from 'react';
import PureRenderMixin  from 'react-addons-pure-render-mixin';

import Voting           from './components/voting';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        const pair = R.pair('A', 'B');
        const choice = 'A';
    }

    render() {
        return (
            <Voting pair={pair} choice={choice}/>
        )
    }
}