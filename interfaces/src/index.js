import React            from 'react';
import ReactDom         from 'react-dom';
import {
    Router,
    Route,
    hashHistory
}                       from 'react-router';
import {
    createStore,
    applyMiddleware
}                       from 'redux';
import {Provider}       from 'react-redux';
import io               from 'socket.io-client';

import reducer          from 'stores/reducer';
import {update}         from 'stores/actions';
import middleware       from 'stores/middleware';
import Voting           from 'components/voting';
import Results          from 'components/results';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => store.dispatch(update(state)));

const store = applyMiddleware(middleware(socket))(createStore)(reducer);

function App(props) {
    return props.children;
}

const routes = (
    <Route component={App}>
        <Route path="/" component={Voting} />
        <Route path="/results" component={Results} />
    </Route>
);

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
