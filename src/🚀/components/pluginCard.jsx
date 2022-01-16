import logger from "../logger";
import { React } from "../modules";
import { pluginAPI } from "../plugins";
import webpack from "../webpack";

function PluginCard(props) {
    const Switch = webpack.findByDisplayName("Switch");
    let [enabled, setEnabled] = React.useState(props.enabled);
    return (
        <div className={`rustcord-plugin-${props.name}`}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.author}</p>
            <Switch 
                checked={enabled}
                onChange={(val) => {setEnabled(val); pluginAPI.togglePlugin(props.name, enabled); pluginAPI.run(props.name, enabled);}}
            />
            
        </div>
    )
}

export default PluginCard;