import webpack from "./webpack"
import patch from "./patch"
import logger from "./logger"

import SettingsElement from "./components/Settings"
const Settings = webpack.findByDisplayName("SettingsView")

function initSettings() {

    // Initialize the database
    let openDB = window.indexedDB.open("rustcord", 1)
    openDB.onsuccess = () => {
        logger.log("Rustcord has loaded the database!")
        window.__RUSTCORDDB = openDB.result
    }
    openDB.onerror = () => {
        logger.error("Rustcord could not load the database!")
    }


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

export default initSettings;