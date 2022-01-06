import { React } from "../modules";

import { pluginAPI } from "../plugins";
import ErrorBoundry from "./ErrorBoundry";

function Settings(props) {
    let [pluginList, setPluginList] = React.useState([])

    pluginAPI.getPlugins().then(p => setPluginList(p))

    return (
        <ErrorBoundry>
            <div className="rustcord-settings">
                {pluginList.map(plugin => (
                    <div className={`rustcord-plugin-${plugin.name}`}>
                        <h2>{plugin.name}</h2>
                    </div>
                ))}
            </div>
        </ErrorBoundry>
    )
}

export default Settings;