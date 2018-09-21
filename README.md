# EvgenServer

Simple node.js server for mobile app.

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
< GET http://<hostAddress>/createUser/?login=<login>&password=<password>

> { createUser: <boolean> }
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< login >_ - new user login  
 _< password >_ - new user password  
 _< boolean >_ - true/false - certificate of success operation

**Example:**

```js
< GET http://localhost/createUser/?login=Alex&password=qwerty

> { createUser: true }
```

## Get User

Need to find exist user on database.

```js
< GET http://<hostAddress>/getUser/?login=<login>&password=<password>

> { getUser: <boolean> }
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< login >_ - exist user login  
 _< password >_ - exist user password  
 _< boolean >_ - true/false - certificate of success operation

**Example:**

```js
< GET http://localhost/getUser/?login=Alex&password=qwerty

> { getUser: true }
```

## Create Text

Need to create new text on database.

```js
< POST http://<hostAddress>/createText

> { "createText": <boolean> }
```

POST data:

```js
{
  "head": <textHead>,
  "body": <textBody>,
  "author": <textAuthor>
}
```

where:  
_< hostAddress >_ - address of computer hosting this app  
_< boolean >_ - true/false - certificate of success operation  
_< textHead >_ - text header  
_< textBody >_ - text body  
_< textAuthor >_ - text author (user login)

**Example:**

```js
< POST http://localhost/createText
```

POST data:

```json
{
  "head": "Here my Headline",
  "body": "Here my Body. I am typing some text here",
  "author": "Alex"
}
```

Response:

```json
> { "createText": true }
```

## Get Text

Need to find arrey fo exist text by author.

```js
< GET http://<hostAddress>/getText/<author>
```

If author exists

```js
> [{
   "textHead":"<textHead>",
   "textBody":"<textBody>",
   "textCreatedAt":"<createdTime>"
  }]
```

If author not exists

```js
> { "getText": <boolean> }
```

where:  
_< hostAddress >_ - address of computer hosting this app  
_< author >_ - text author (user login) which texts you need  
_< textHead >_ - text header  
_< textBody >_ - text body  
_< createdTime >_ - time of creation current text
_< boolean >_ - true/false - certificate of success operation  

**Example:**

```js
< GET http://localhost/getText/Alex

> [{ "textHead":"Here my Headline","textBody":"Here my Body. I am typing some text here","textCreateDate":"2018-09-21T09:21:03.365Z" }]
```
