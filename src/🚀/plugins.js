import webpack from "./webpack"
import { patch } from "./patch"
import { get, set, del, update } from "idb-keyval"
import logger from "./logger"

import SettingsElement from "./components/Settings"
const Settings = webpack.findByDisplayName("SettingsView")

let pluginAPI = {
    getPlugins: async () => {
        return await get("plugins") || []
    },
    addPlugin: async (plugin) => {
        await set("plugins", [...(await pluginAPI.getPlugins()), plugin])
    },
    removePlugin: async (plugin) => {
        await update("plugins", plugins => plugins.filter((p) => p != plugin))
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

export { initSettings, pluginAPI };