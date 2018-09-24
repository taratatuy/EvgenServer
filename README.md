# EvgenServer

Simple node.js server for mobile app.

Current version and last reload you can find by pass 'http://<hostAddress>/'

# API

## Syntax Notes

The examples below use these syntax conventions:

```
Lines prefixed with:  |  Are sent from:	 |         To:         |
        <                  client                server
        >                  server            connecting client
```

## Create User

Need to create user on database.

```js
< GET http://<hostAddress>/user/create/?login=<login>&password=<password>&email=<email>

> { createUser: <boolean> }
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< login >_ - unique new user login  
 _< password >_ - new user password  
 _< email >_ - unique new user email  
 _< boolean >_ - true/false - certificate of success operation

**Example:**

```js
< GET http://localhost/user/create/?login=Alex&password=qwerty&email=Alex@gmail.com

> { createUser: true }
```

## Get User

Need to find exist user on database.

```js
< GET http://<hostAddress>/user/get/?login=<login>&password=<password>

> { getUser: <boolean> }
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< login >_ - exist user login  
 _< password >_ - exist user password  
 _< boolean >_ - true/false - certificate of success operation

**Example:**

```js
< GET http://localhost/user/get/?login=Alex&password=qwerty

> { getUser: true }
```

## Create Text

Need to create new text on database.

```js
< POST http://<hostAddress>/text/create

> { "createText": <boolean> }
```

POST data:

```js
{
  "head": <textHead>,
  "body": <textBody>,
  "login": <textAuthor>
}
```

where:  
_< hostAddress >_ - address of computer hosting this app  
_< boolean >_ - true/false - certificate of success operation  
_< head >_ - text header  
_< body >_ - text body  
_< login >_ - unique user login

**Example:**

```js
< POST http://localhost/text/create
```

POST data:

```json
{
  "head": "Here my Headline",
  "body": "Here my Body. I am typing some text here",
  "login": "Alex"
}
```

Response:

```json
> { "createText": true }
```

## Get Text

Need to find array of exist texts by author.

```js
< GET http://<hostAddress>/text/get/?login=<login>
```

If author exists

```js
> [{
   "head":"<textHead>",
   "body":"<textBody>",
   "textCreatedAt":"<createdTime>"
  }]
```

If author not exists

```js
> { "getText": <boolean> }
```

where:  
_< hostAddress >_ - address of computer hosting this app  
_< login >_ - unique user login which texts you need  
_< head >_ - text header  
_< body >_ - text body  
_< createdTime >_ - time of creation current text  
_< boolean >_ - true/false - certificate of success operation

**Example:**

```js
< GET http://localhost/text/get/?login=Alex

> [{ "head":"Here my Headline","body":"Here my Body. I am typing some text here","textCreateDate":"2018-09-21T09:21:03.365Z" }]
```
