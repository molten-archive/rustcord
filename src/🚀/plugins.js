import webpack from "./webpack"
import { patch } from "./patch"
import logger from "./logger"
import { createPersistentNest } from "./util"

import * as nests from "nests"

import SettingsElement from "./components/Settings"
const Settings = webpack.findByDisplayName("SettingsView")

async function initiazliePluginNest() {
    window.rust.plugins.pluginNest = await createPersistentNest("RUSTCORD_PLUGINS");
}

let pluginAPI = {
    getPlugins: () => {
        return pluginAPI.pluginNest.list
    },
    register: (plugin) => {
        pluginAPI.pluginNest.list.push(plugin)
    }
}

function initSettings() {
    // cumcord was a mistake
    return patch(Settings.prototype, "getPredicateSections", (res, args) => {
        const position = res.findIndex((item) => { return item.section == "changelog" }) - 1

        if (position < 0) return res;

        const rustySettings = [
            { section: "DIVIDER" },
            { section: "HEADER", label: "rust" },
            { section: "RUSTCORD_SETTINGS", label: "rusty settings", element: SettingsElement }
        ]

        res.splice(position, 0, ...rustySettings)

        return res
    })
}

export { initSettings, pluginAPI, initiazliePluginNest };