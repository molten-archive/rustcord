import modules from "../modules";
const React = modules.React

import webpack from "../webpack";
import { pluginAPI } from "../plugins";
import { injectCSS } from "../patch";

function Settings(props) {
    let plugins = pluginAPI.getPlugins();

    return (
        <div className="rustcord-settings">
            {plugins.map(plugin => (
                <div className={`rustcord-plugin-${plugin.name}`}>
                    <h2>{plugin.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default Settings;