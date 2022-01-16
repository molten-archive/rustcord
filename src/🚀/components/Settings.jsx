import { React } from "../modules";

import { pluginAPI } from "../plugins";
import ErrorBoundry from "./ErrorBoundry";
import PluginCard from "./pluginCard";

function Settings(props) {
    let [pluginList, setPluginList] = React.useState([])

    pluginAPI.getPlugins().then(p => setPluginList(p))

    return (
        <div className="rustcord-settings">
            {pluginList.map(plugin => (
                <PluginCard
                    name={plugin.name}
                    description={plugin.description}
                    enabled={plugin.enabled}
                    author={plugin.author}
                />
            ))}
        </div>
    )
}

export default Settings;