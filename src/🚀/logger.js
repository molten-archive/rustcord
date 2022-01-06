

let logger = {
    log: (...args) => {
        console.log("%c[rustcord]", "color: #ff69b4; font-weight: bold;", ...args, `\n\n${__dirname}`)
    },
    error: (...args) => {
        console.error("%c[rustcord]", "color: #ff0000; font-weight: bold;", ...args, `\n\n${__dirname}`)
    }
}
export default logger;