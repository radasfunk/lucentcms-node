import axios from "axios"

let client = class LucentClient {
    constructor({ channel, access_key, secret_key, locale }) {
        this.config = {
            channel,
            access_key,
            secret_key,
            locale
        }

        let httpClient = axios 

        httpClient.defaults.headers.common['Lucent-Channel']  = channel
        httpClient.defaults.headers.common['Lucent-User']     = access_key
        httpClient.defaults.headers.common['Authorization']   = 'Bearer ' + secret_key
        httpClient.defaults.headers.common['Accept-Language'] = locale
        
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
                data, params, headers
            }

            console.log("conf->",conf,'data =>',data)

            let res = await this.httpClient[method](endpoint, conf)
            
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
    
    post(data = {}, headers = {}) {
        return this.baseRequest({ method: 'post',endpoint, data, headers })
    }

    put(data = {}, headers = {}) {
        return this.baseRequest({ method: 'put',endpoint, data, headers })
    }

    patch(data = {}, headers = {}) {
        return this.baseRequest({ method: 'patch',endpoint, data, headers })
    }

    delete(data = {}, headers = {}) {
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

    upload(files = [], filename, headers = {}) {

        let formData = new FormData()

        files.forEach((element,i) => {
            formData.append('multipart[' + i + ']',element)  
        })
        
        for (var [key, value] of formData.entries()) { 
            console.log('k->v',key, value);
        }

        headers['Content-Type'] = 'multipart/form-data'

        return this.baseRequest({ method: 'post', endpoint: 'files/', data: formData, headers })
    }
}

export default client