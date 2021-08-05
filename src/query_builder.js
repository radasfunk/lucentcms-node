export class LucentQueryBuilder {

    constructor(path = null, content_type = null) {
        this.q = {}

        this.path = path
        this.contentType = content_type
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

    regex(field,value) {
        return this.raw(field,value,'regex')
    }

    exists(field,value) {
        return this.raw(field,value,'exists')
    }

    nexists(field,value) {
        return this.raw(field,value,'nexists')
    }

    eq(field,value) {
        return this.raw(field,value,'eq')
    }

    ne(field,value) {
        return this.raw(field,value,'ne')
    }

    in(field,value) {
        return this.raw(field,value,'in')
    }

    nin(field,value) {
        return this.raw(field,value,'nin')
    }

    lt(field,value) {
        return this.raw(field,value,'lt')
    }

    lte(field,value) {
        return this.raw(field,value,'lte')
    }

    gt(field,value) {
        return this.raw(field,value,'gt')
    }

    gte(field,value) {
        return this.raw(field,value,'gte')
    }

    false(field) {
        return this.raw(field,null,'false')
    }

    true(field) {
        return this.raw(field,null,'true')
    }

    ntrue(field,value) {
        return this.raw(field,value,'ntrue')
    }

    nfalse(field,value) {
        return this.raw(field,value,'nfalse')
    }

    null(field) {
        return this.raw(field,null,'null')
    }

    empty(field,) {
        return this.raw(field,null,'empty')
    }

    meta(value) {
        this.q['meta'] = value
        return this
    }

    limit(value) {
        this.q['limit'] = value
        return this
    }

    skip(value) {
        this.q['skip'] = value
        return this
    }

    sort(value) {
        this.q['sort'] = value
        return this 
    }

    include(value) {
        this.q['include'] = value
        return this
    }

    includeAll() {
        this.q['include'] = '*'
        return this
    }

    raw(field, value = null, operator = null) {
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

        if(this.contentType !== null) {
            str += "schema=" + this.contentType
        }

        if(this.path !== null) {
            return this.path + '?' + str
        }

        return '?' + str 
    }
}
