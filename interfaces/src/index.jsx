import React    from 'react';
import ReactDom from 'react-dom';
import {
    Router,
    Route,
    hashHistory
}               from 'react-router';

import App      from 'components/app';
import Voting   from 'components/voting';
import Results  from 'components/results';

const routes = (
    <Route component={App}>
        <Route path="/" component={Voting} />
        <Route path="/results" component={Results} />
    </Route>
);

ReactDom.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('app')
);
