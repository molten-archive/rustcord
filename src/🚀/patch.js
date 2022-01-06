function patch(parent, functionName, callback) {
    if(typeof parent[functionName] != 'function' || !parent.hasOwnProperty(functionName)) {
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