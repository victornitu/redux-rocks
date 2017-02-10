import * as r       from 'ramda';
import config       from 'config';

import * as Store   from 'stores/store';
import * as Server  from 'tools/server';
import * as l       from 'tools/logger';

l.info('Start application');

const defaultPort = config.get('server.port');
const port = r.propOr(defaultPort, 2, process.argv);

export const store = Store.build();
l.info('Store build');

Server.start(port, store);
l.info('Server started');

store.dispatch({
    type: 'INIT',
    entries: require('./../data/entries.json')
});
l.info('Data bootstrapped');

store.dispatch({type: 'PICK'});
l.info('First pick done');
