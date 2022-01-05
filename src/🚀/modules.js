import webpack from "./webpack"

let modules = {
    React: webpack.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", "createElement")
}

export default  modules;