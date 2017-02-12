import * as r   from 'ramda';

export default function(state = {}, action) {
    switch(action.type) {
        case 'UPDATE':
            return update(action.state, state);
        case 'VOTE':
            return vote(action.entry, state);
    }
    return state;
}

function update(latest, state = r.__) {
    return r.pipe(
        r.merge(r.__, latest),
        reset
    )(state);
}

function reset(state = r.__) {
    const choice = r.propOr('', 'choice', state);
    return r.when(
        r.both(r.has('choice'), pairHasNot(choice)),
        r.dissoc('choice')
    )(state);
}

function vote(entry, state = r.__) {
    return r.when(
        pairHas(entry),
        r.assoc('choice', entry)
    )(state);
}

function pairHasNot(option) {
    return r.complement(pairHas(option));
}

function pairHas(option) {
    return r.pathSatisfies(containsIfExists(option), ['vote', 'pair']);
}

function containsIfExists(option) {
    return r.both(
        r.complement(r.isNil),
        r.contains(option)
    );
}
