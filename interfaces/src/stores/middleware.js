import * as r from 'ramda';

export default socket => store => next => action => {
    if(r.path(['meta', 'remote'], action)) {
        console.log('Send action: ', action);
        socket.emit('action', action);
    }
    return next(action);
}
