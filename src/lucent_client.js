import axios from "axios"

export default class LucentClient {
    constructor({ channel, access_key, secret_key, locale }) {
        this.config = {
            channel,
            access_key,
            secret_key,
            locale
        }

        let httpClient = axios

        httpClient.defaults.headers.common['Lucent-Channel']  = channel
        httpClient.defaults.headers.common['Authorization']   = 'Bearer ' + secret_key
        httpClient.defaults.headers.common['Content-Type']    = 'application/json'

        if (access_key) {
            httpClient.defaults.headers.common['Lucent-User'] = access_key
        }

        if (locale) {
            httpClient.defaults.headers.common['Accept-Language'] = locale
        }
        
        httpClient.defaults.baseURL = "https://api.lucentcms.com/api/"

        this.httpClient = httpClient
    }

    getConfig() {
        return this.config
    }

    getClient() {
        return this.httpClient
    }

    baseRequest({ method, endpoint,data = {}, params = {}, headers = {}}) {
        let promise = new Promise(async (resovle, reject) => {
            const conf = {
                params, headers
            }

            let res = await this.httpClient[method](endpoint, data,conf)
            
            if (res.status >= 400) {
                reject(res)
            } else {
                if (res['data']['errors'] !== null && res['data']['errors'].length > 0) {
                    reject(res['data'])
                } else {
                    resovle(res['data'])
                }
            }
        })

        return promise
    }

    get(endpoint, params = {}, headers = {}) {
        return this.baseRequest({ method: 'get',endpoint, params, headers })
    }
    
    post(endpoint, data = {}, headers = {}) {
        return this.baseRequest({ method: 'post',endpoint, data, headers })
    }

    put(endpoint, data = {}, headers = {}) {
        return this.baseRequest({ method: 'put',endpoint, data, headers })
    }

    patch(endpoint, data = {}, headers = {}) {
        return this.baseRequest({ method: 'patch',endpoint, data, headers })
    }

    delete(endpoint, data = {}, headers = {}) {
        return this.baseRequest({ method: 'delete',endpoint, data, headers })
    }
    
    getDocuments(params = {}, headers = {}) {
        return this.baseRequest({ method: 'get', endpoint: 'documents/', params, headers })
    }

    createDocument(schema ,content = {}, headers = {}) {
        let requestData = {
            schema,
            content,
        }

        return this.baseRequest({ method: 'post', endpoint: 'documents/', data: requestData, headers })
    }

    upload(form, headers = {}) {

        headers['Content-Type'] = 'multipart/form-data'

        return this.baseRequest({ method: 'post', endpoint: 'files', data: form, headers })
    }
}
