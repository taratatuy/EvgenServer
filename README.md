# EvgenServer

Simple node.js server for mobile app.

# API

## Syntax Notes

The examples below use these syntax conventions:

```
Lines prefixed with:  |  Are sent from:	 |         To:            |
        <                  client                server
        >                  server            connecting client
```

## Create User

Need to create user in database.

```js
< GET http://<hostAddress>/createUser/?login=<login>&password=<password>

> { createUser: <boolean> }
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< login >_ - new user login  
 _< password >_ - new user password  
 _< boolean >_ - true/false

**Example:**

```js
< GET http://localhost/createUser/?login=Alex&password=qwerty

> { createUser: true }
```

## Get User

Need to find existed user in database.

```js
< GET http://<hostAddress>/getUser/?login=<login>&password=<password>

> { getUser: <boolean> }
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< login >_ - existed user login  
 _< password >_ - existed user password  
 _< boolean >_ - true/false  
  
**Example:**

```js
< GET http://localhost/getUser/?login=Alex&password=qwerty

> { getUser: true }
```
