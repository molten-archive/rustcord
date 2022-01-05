function patch(parent, functionName, callback) {
    if(!parent) {
        throw new Error('are you retarded');
    }
    if(typeof parent[functionName] != 'function') {
        throw new Error(`eat shit`);
    }
    const original = parent[functionName];
    parent[functionName] = function() {
        let result = original.apply(this, arguments);
        callback.apply(this, [result, arguments])
        return result;
    }

    return () => {
        parent[functionName] = original;
    }
}

export default patch;