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
    removePlugin: async () => {
        await del("plugins")
    },
    togglePlugin: async (pluginName, tval) => {
        const plugins = await pluginAPI.getPlugins()
        let plugin = plugins.find((p) => p.name == pluginName)
        plugin.enabled = tval || !plugin.enabled
        await update("plugins", val => [...val.filter(p => p.name != pluginName), plugin])
    },
    run: async (pluginName, toggle) => {
        const plugins = await pluginAPI.getPlugins()
        const plugin = plugins.find((p) => p.name == pluginName)
        if (!plugin) return
        const pluginCode = await fetch(plugin.url).then(res => res.text())
        eval(pluginCode)
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