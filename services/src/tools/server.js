import Server   from 'socket.io';

import * as l   from './logger';

export function start(port, store) {
    const io = new Server().attach(port);
    l.success('Server: listening on port ', port);

    store.subscribe(
        () => io.emit('state', store.getState())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState());
        socket.on('action', store.dispatch.bind(store));
    });
}