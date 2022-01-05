import patch from "./🚀/patch";
import demonpatcher from "demonpatcher"
import hell from "hell.js"
import webpack from "./🚀/webpack";
import initSettings from "./🚀/settings";
import modules from "./🚀/modules";

if (window.rust) {
    console.log('We have detected rust, time to anihilate your mom.'); 
    if (window.rust._unpatch) window.rust._unpatch()
    delete window.hello
}

window.rust = {
    patcher: {
		patch:     patch,
		hellPatch: demonpatcher.monkeyPatch
	},
    hell:    hell,
    webpack: webpack,
    common:  modules
}
window.rust._unpatch = initSettings()
