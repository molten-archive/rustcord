import webpack from "./webpack"
import { patch } from "./patch"
import logger from "./logger"
import { get, set } from "idb-keyval"

import SettingsElement from "./components/Settings"
import modules from "./modules"
const Settings = webpack.findByDisplayName("SettingsView")

let pluginAPI = {
    getPlugins: async (plugin) => {
        return await get("plugins") || []
    },
    register: async (plugin) => {
        await set("plugins", [...(await pluginAPI.getPlugins()), plugin])
        return await pluginAPI.getPlugins()
    }
}

async function initSettings() {
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

export { initSettings, pluginAPI };