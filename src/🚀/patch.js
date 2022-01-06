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

function injectCSS(css) {
    const style = document.createElement('style');
    style.className = "__RUSTCORD_CSS"
    style.innerHTML = css;
    document.head.appendChild(style);

    return () => style.remove()
}

export { patch, injectCSS };