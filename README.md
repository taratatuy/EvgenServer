# EvgenServer
Simple node.js server for mobile app. 

# API


h1 Create User  
=======================
Need to create user in database.  
  
```js
< GET /createUser/?login=<login>&password=<password>

> { createUser: <boolean> }
```  
 
where:  
 < login > - existed user login  
 < password > - existed user password  
 < boolean > - true/false  
  
**Example:**  
```js
< GET /createUser/?login=Alex&password=qwerty

> { createUser: true }
```
  
h1 Get User 
=======================
Need to find existed user in database.  
  
```js
< GET /getUser/?login=<login>&password=<password>

> { getUser: <boolean> }
```  
   
where:  
 < login > - existed user login  
 < password > - existed user password  
 < boolean > - true/false  
    
**Example:**  
```js
< GET /getUser/?login=Alex&password=qwerty

> { getUser: true }
```
