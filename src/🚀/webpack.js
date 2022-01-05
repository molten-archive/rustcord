function getModules() {
    let modules;

    webpackChunkdiscord_app.push([
        [Math.random().toString(36)],
        {},
        (e) => {
            modules = e;
        },
    ]);

    return modules.c;
}

function filterModules(moduleList, filter) {
    let modules = [];

    for (m in moduleList) {
        if (moduleList.hasOwnProperty(m)) {
            const module = moduleList[m].exports;
            if (module.__esModule && module.default && filter(module.default)) {
                modules.push(module.default);
            }

            if (filter(module)) {
                modules.push(module);
            }
        }
    }

    return modules
}

let webpack = {
    modules: getModules(),
    find: (filter) => { return filterModules(webpack.modules, filter)[0]; },
    findAll: (filter) => { return filterModules(webpack.modules, filter); },
    findByDisplayName: (displayName, def = true) => {
        return def
            ? webpack.find((module) => module.displayName === displayName)
            : webpack.find(
                (module) => module?.default?.displayName === displayName);
    },

}

export default webpack;