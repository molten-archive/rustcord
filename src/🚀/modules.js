import webpack from "./webpack"

let modules = {
    React: webpack.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", "createElement"),
    uuid: { v4: webpack.findByProps("v4", "v1") },
}

export default  modules;