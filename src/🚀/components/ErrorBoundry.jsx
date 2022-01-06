import logger from "../logger";
import { React } from "../modules";

class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        logger.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="rustcord-error">
                    <h1>rustcord fucking died</h1>
                    <p>please contact the local emergency services such as (112 in europe 🇪🇺, and 911 in the states 🇺🇸</p>
                </div>
            )
        } else return (
            <></>
        )
    }
}

export default ErrorBoundry;