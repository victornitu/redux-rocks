import {createStore}    from 'redux';

import reducer          from './reducer';

export function build() {
    return createStore(reducer);
}