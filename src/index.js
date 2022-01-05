import patch from "./🚀/patch";
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
    patch: patch,
    hell: hell,
    webpack: webpack,
    common: modules
}
window.rust._unpatch = initSettings()