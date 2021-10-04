# lucentcms-node

LucentCMS driver for node js.

### installation 


```bash
npm i @radical-elements/lucentcms-node
```

### Import

We have two files that can be imported, the first one being the `LucentClient` and the second one being `LucentQueryBuilder`. 

```node
import { LucentClient, LucentQueryBuilder } from '@radical-elements/lucentcms-node'
```

### Configure

For more information regarding the keys, you can visit [LucentCMS API documentations](https://new.lucentcms.com/documentation/intro).

```node
let config = {
  channel : "channel-id",
  access_key : "access-key",
  secret_key : "secret-key",
  locale : "locale", // optional
}
      
let lucy = new LucentClient(config)
```

### LucentClient methods

As of now, we have the following methods

- get() 
- post() 
- put() 
- patch() 
- delete() 
- getDocuments()
- createDocument()
- upload() 

All of these will return a promise that can be used with `then`, `catch` and `finally`. 

### get() 

*Method Signature*

```node
get(endpoint, params = {}, headers = {})
```
example 

```node

let params = {
    hello: 'world' // must follow a valid schema, available on Lucent API Documentation or use the query builder.
}

let headers = {
    'Custom-Header' : 'Custom-Value'
}

lucy.get('documents', params, headers) // headers and params are optional
  .then( res => {} )
  .catch( err => {})
```


### post() 

*Method Signature*

```node
post(endpoint, data = {}, headers = {})
```
example 

```node
let data = {
    hello: 'world' // must follow a valid schema, available on Lucent API Documentation or use the query builder.
}

let headers = {
  'Custom-Header' : 'Custom-Value'
}

lucy.post('documents',data, headers)
  .then( res => {} )
  .catch( err => {})
```

### put() 

*Method Signature*

```node
put(endpoint, data = {}, headers = {})
```
example 

```node
let data = {
    hello: 'world' // must follow a valid schema, available on Lucent API Documentation or use the query builder.
}


lucy.put('documents',data)
  .then( res => {} )
  .catch( err => {})
```

### patch() 

*Method Signature*

```node
patch(endpoint, data = {}, headers = {})
```
example 

```node
let data = {
    hello: 'world' // must follow a valid schema, available on Lucent API Documentation or use the query builder.
}


lucy.patch('documents',data)
  .then( res => {} )
  .catch( err => {})
```


### delete() 

*Method Signature*

```node
delete(endpoint, data = {}, headers = {})
```
example 

```node
let data = {
    hello: 'world' // must follow a valid schema, available on Lucent API Documentation or use the query builder.
}


lucy.delete('documents',data)
  .then( res => {} )
  .catch( err => {})
```

### getDocuments()

*Method Signature*

```node
getDocuments(params = {}, headers = {})
```

Params are same as `get()` method. You can use `LucentQueryBuilder` too. 


### createDocument() 

*Method Signature*

```node
createDocument(schema ,content = {}, headers = {}) 
```

*schema* is the schema you've created from the dashboard, or the "content type" you can say. `content` is the `key-value` pair where the value  
can be string or an object ( if you are using/specifying `locale`).


When you are specifying locale.
```node
 let content =  {
  "title": {
    "en-US": "An Amazing title",
    "fr-FR": "Un titre incroyable"
  }
}
```

The following is also valid, when you are not specifying locale,
```node
let content =  {
  "title": "An Amazing title"
}
```


### upload() 

*Method Signature*

```node
upload(formData, headers = {}) 
```

To upload a single or multiple files, you must create a form data instance and pass it as an argument in the `upload` method.

```node

let form = new FormData

form.append('files[0]',event.target.files[0])

// or if you have multiple files

listOfFiles.forEach((file,i) => {
  form.append('files[' + i +']',file)
})

lucy.upload(form)
  .then(res => {
    console.log('successfully uploaded! check res.data[]',res)
  })
  .catch(err => {
    console.log('there was an error',err)
  })
  .finally(() => {
    console.log('finally do something!')
  })
```
### LucentQueryBuilder

It is a helping class that will help you build up your query.

```node
let builder = new LucentQueryBuilder()

// if you want to specify the schema ( content type )

let builder = new LucentQueryBuilder('articles')
```

With the `LucentQueryBuilder` you can `filter` and manipulate `pagination`, `meta` and `includes`. [Filter options can be found here](https://new.lucentcms.com/documentation/filter#operator), the builder implements these options.


### Available Methods

```node
where(field, value)

or(field,value)

in(field,value)

regex(field,value)

exists(field,value) 

nexists(field,value) 

eq(field,value) 

ne(field,value) 

in(field,value)

nin(field,value)

lt(field,value) 

lte(field,value) 

gt(field,value) 

gte(field,value) 

false(field)

true(field)

ntrue(field,value) 

nfalse(field,value) 

null(field)
    
empty(field) 

meta(value)
    
limit(value)
    
skip(value)

sort(value)

include(value)

includeAll()

getQueryString() 

getQuery(withSchema = true)
```

As of this being a builder, every method except `getQueryString` and `getQuery` returns an instance of itself. Meaning you can do,

```node

let builder = new LucentQueryBuilder('articles')

builder.where('title', 'hello')
  .or('author_name', 'Aryan Ahmed Anik')
  .in('category_id', '1,2,3')
  .meta('page')
  .sort('title') // or use '-title' for descending
  .include('a_related_schema') // or use .includeAll() to include every related schema
  .skip(10) 


lucy.get('documnets', builder.getQuery() )
  .then(res => {})
  .catch( err => {})
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

### Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email hey@lucentcms.com instead of using the issue tracker.
