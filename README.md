# EvgenServer
Simple node.js server for mobile app. 

# API
````
Lines prefixed with:	Are sent from:		To:
    <                  	client			    	server
    >		             		server		  	  	connecting client
````
Create User  
----------------------------
Need to create user in database.  
  
```js
< GET /createUser/?login=<login>&password=<password>

> { createUser: <boolean> }
```  
 
where:  
 _< login >_ - existed user login  
 _< password >_ - existed user password  
 _< boolean >_ - true/false  
  
**Example:**  
```js
< GET /createUser/?login=Alex&password=qwerty

> { createUser: true }
```
  
Get User 
----------------------------
Need to find existed user in database.  
  
```js
< GET /getUser/?login=<login>&password=<password>

> { getUser: <boolean> }
```  
   
where:  
 _< login >_ - existed user login  
 _< password >_ - existed user password  
 _< boolean >_ - true/false  
    
**Example:**  
```js
< GET /getUser/?login=Alex&password=qwerty

> { getUser: true }
```
