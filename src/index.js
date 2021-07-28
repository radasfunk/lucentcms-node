import axios from "axios"

let client = class LucentClient {
    constructor({ channel, access_key, secret_key, locale }) {
        this.config = {
            channel,
            access_key,
            secret_key,
            locale
        }    
    }

    getConfig() {
        return this.config
    }
}

export default client