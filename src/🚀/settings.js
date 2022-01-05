import webpack from "./webpack"
import patch from "./patch"
import modules from "./modules"

const React = modules.React
import SettingsElement from "./components/Settings"
const Settings = webpack.findByDisplayName("SettingsView")

function initSettings() {
    return patch(Settings.prototype, "getPredicateSections", (res, args) => {
        const position = res.findIndex((item) => { return item.section == "changelog" }) - 1
        
        if (position < 0) return res;

        const rustySettings = [
            { section: "DIVIDER" },
            { section: "HEADER", label: "rust" },
            { section: "RUSTCORD_SETTINGS", label: "rusty settings", element: SettingsElement}
        ]

        res.splice(position, 0, ...rustySettings)

        return res
    })
}

export default initSettings