import modules from "../modules";
const React = modules.React

import webpack from "../webpack";
import pluginAPI from "../plugins";

function Settings(props) {
    return (
        <div className="rustcord-settings">
            {pluginAPI.plugins.map(plugin => (
                <div className={`rustcord-plugin-${plugin.name}`}>
                    <h2>{plugin.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default Settings;