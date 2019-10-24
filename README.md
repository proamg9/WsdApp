WSDAPP
====================

## Stack

Node, Grunt, Express, PUG.


## Install dependencies

+ install [NodeJS] (globally)
+ install [NPM] (globally)
+ install [Grunt] (globally)

## To run

CD into the project folder and run:

+ npm install
To Install dependancies.

Then,
+ npm start

To run the app locally at localhost:3000


## Design

The flow of the application is built using a Backend and frontend(we only render on the server side, no client side framework). 
This provides a scalable and clean project structure to enhance and develop features further.

The homepage loads up and checks if user is already signed in, if not, it will direct the user to the sign-in box.

Using Oauth credentials, once signed in, the Dash is displayed in which you'll have access to your profile.




** Backend

* * /routes folder and app.js

We use Express to write middleware, handle routes and sessions.  

PassportJs is used to develop the Authentication system strategy.  No local strategies are in place, only Oauth Wsd remote auth system is used.



** FrontEnd 

* * /views directory

The view is fully rendered on the Server side using Pug.
Rendering also takes place with Bootstrap to provide a responsive design.

We use JQuery script to allow a profile image to be uploaded in the users profile within the dash.




## Controllers

[index.js] : 
Handles Routes and uses passport Auth api.
  
This contains the route handles to check if the user is logged in. If the user is logged in, then It will display the Dashboard page. 
If the user is not logged in, the user will be redirected to the login url. 
And if url is coming from authorised url, then this will save session of user.

[/profile] :  this contains methods to display user profile. if user is logged in already then it will display the user's profile in frontend .
Redirects to Signin page if authentication returns false.

[/login] : this contains the functionality to signin for users.

[/logout] : Logout function - logouts user’s profile and clear’s session.

[/upload] : this contains methods to upload a user avatar. It will save uploaded avatar url to the current session(temp) of the user, locally, but should implement a proper DB at the backend in a production environment.

## Tests

Some basic tests implemented.

To run tests, cd into the root folder of the app and enter:

Npm test