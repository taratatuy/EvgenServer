# EvgenServer

Simple node.js server for mobile app.

Current version and last reload you can find by pass `http://<hostAddress>/`

# API

## Syntax Notes

The examples below use these syntax conventions:

```
Lines prefixed with:  |  Are sent from:	 |         To:         |
        <                   client               server
        >                   server          connecting client
```

## Token session system

Для получения доступа к клиентским данным используется система доступа через токены.  
Существует 2 вида токенов: access token и refresh token.  
Пользователю выдаются оба токена в момент его авторизации.

Access token исользуется для прохождения верификации пользователя и действителен в течении 2х минут.

Refresh token действителен в течении 24 часов и используется для получения новой пары access и refresh токенов без прохождения повторной авторизации.
Может быть использован лишь единожды.
По прошествию 24 часов текущий refresh token становится недействительным и пользователю необходимо заново пройти процедуру авторизации.

## Authorization

`Access by access token` means that you need send access token to complete operation.
Every request labeled this mark is required authorization header. You need to include it.

Header:

```js
"Authorization": "<accessToken>"
```

where:  
 _< accessToken >_ - current access token for session

If your token expired and you need to generate new access and refresh tokens:

```json
> { "message": "Token expired!" }
```

**Header example:**

```json
"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNTM3OTM5NTIxLCJleHAiOjE1Mzc5Mzk2NDF9.8nTxJh4GN6cDHw3gOBd6684CMoBbiyCaUDD8Cm-eoKY"
```

## Tokens refresh

This method required for getting tokens via current refresh token without user authorization. You get new tokens in response body.

```js
< POST http://<hostAddress>/user/refresh-tokens

> {
    "accessToken": "<newAccessToken>",
    "refreshToken":"<newRefreshToken>"
  }
```

POST data:

```js
{
  "refreshToken": "<refreshToken>"
}
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< newAccessToken >_ - new access token for current session  
 _< newRefreshToken >_ - new refresh token for generation next couple  
 _< refreshToken >_ - previous refresh token

**Example:**

```js
< POST http://localhost/user/refresh-tokens
```

POST data:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZjkyYjU4LTdkZTEtNDdlNy1iOTMyLTQxYTFhN2RlMmQyMiIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNTM3OTM5NTIxLCJleHAiOjE1MzgwMjU5MjF9.AOWM7PLhvClHszUqgvEAdI2ubkC8JiGgGbaZDFEFf28"
}
```

Response:

```json
> {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNTM3OTk2ODc1LCJleHAiOjE1Mzc5OTY5OTV9.b_SdxzTwR4xWSfTw_rN-_2H1ZAWc2uBqSQSInoKKOjo",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTllZGQ5LThmMjYtNDYwMS04NmMzLTQ1ODdkZjNjZDIyNiIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNTM3OTk2ODc1LCJleHAiOjE1MzgwODMyNzV9.QP6y5Sp9_CZd6i1RdnfEIlXuMzlREMtqvRIyPXUcr9M"
  }
```

## Create User

Provide user creation and add it to database.

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

This method is necessary for authorization exist user and getting access and refresh tokens.

```js
< GET http://<hostAddress>/user/get/?login=<login>&password=<password>

> {
    "accessToken": "<accessToken>",
    "refreshToken":"<refreshToken>"
  }
```

If incorrect user login or password.

```json
> { "createUser": false }
```

where:  
 _< hostAddress >_ - address of computer hosting this app  
 _< login >_ - exist user login  
 _< password >_ - exist user password  
 _< accessToken >_ - access token for current session  
 _< refreshToken >_ - refresh token for current session

**Example:**

```js
< GET http://localhost/user/get/?login=Alex&password=qwerty

> {
    "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNTM3OTM5NTIxLCJleHAiOjE1Mzc5Mzk2NDF9.8nTxJh4GN6cDHw3gOBd6684CMoBbiyCaUDD8Cm-eoKY",
    "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZjkyYjU4LTdkZTEtNDdlNy1iOTMyLTQxYTFhN2RlMmQyMiIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNTM3OTM5NTIxLCJleHAiOjE1MzgwMjU5MjF9.AOWM7PLhvClHszUqgvEAdI2ubkC8JiGgGbaZDFEFf28"
  }
```

## Create Text `Access by access token`

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

## Get Text `Access by access token`

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
