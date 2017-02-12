export function update(state) {
    return {
        type: 'UPDATE',
        state
    };
}

export function vote(entry) {
    return {
        meta: {remote: true},
        type: 'VOTE',
        entry
    };
}

export function pick() {
    return {
        meta: {remote: true},
        type: 'PICK'
    };
}
