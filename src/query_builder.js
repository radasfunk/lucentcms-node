export class LucentQueryBuilder {

    constructor(path = null) {
        this.q = {}

        this.path = path
    }

    where(field, value) {
        return this.raw(field,value)
    }

    or(field,value) {
        return this.raw(field,value,'or')
    }

    in(field,value) {
        return this.raw(field,value,'in')
    }

    raw(field, value, operator = null) {
        let q = 'filter'

        if (operator !== null) {
            q = q + '[' + operator + ']'
        }

        q = q + '[' + field + ']' 

        this.q[q] = value
        return this
    }    

    getQueryString() {
        let str = ""

        for (let key in this.q) {
            if (str != "") {
                str += "&"
            }
            str += key + "=" + this.q[key]
        }

        if(this.path !== null) {
            return this.path + '?' + str
        }

        return '?' + str 
    }
}
