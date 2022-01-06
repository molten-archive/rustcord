import { React } from "../modules";

function PluginCard(props) {
    return (
        <div className={`rustcord-plugin-${props.name}`}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            
        </div>
    )
}

export default PluginCard;