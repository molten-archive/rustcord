import * as nests from "nests"
import { get, set } from "idb-keyval"

// this is just cumcord at this point
async function createPersistentNest(prefix) {
    const cached = await get(`__${prefix}_RUSTCORD_NEST`)
    const nest = nests.make(cached)

    let save = () => set(`__${prefix}_RUSTCORD_NEST`, { ...nest.ghost })

    nest.on(nests.Events.SET, save)
    nest.on(nests.Events.DELETE, save)

    return nest
}

export { createPersistentNest }