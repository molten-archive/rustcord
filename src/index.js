import patch from "./🚀/patch";
import demonpatcher from "demonpatcher"
import hell from "hell.js"
import webpack from "./🚀/webpack";
import modules from "./🚀/modules";
import initSettings from "./🚀/plugins";

if (window.rust) {
    console.log('We have detected rust, time to anihilate your mom.'); 
    for (let patch in window?.rust?._unpatch) {
        patch()
    }
    delete window.hello
}

if (!window.localStorage.rustcord) {
    window.localStorage.setItem("rustcord", {})
}

window.rust = {
    patcher: {
		patch:     patch,
		hellPatch: demonpatcher.monkeyPatch
	},
    hell:    hell,
    webpack: webpack,
    common:  modules,
    _unpatch: []
}
window.rust._unpatch = initSettings();