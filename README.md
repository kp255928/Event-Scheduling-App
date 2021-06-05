Event Scheduling App with Nodejs, Express, Mongodb, React, Mongoose, Axios and Passport authentication.



Set Up:

Install `Nodejs` and `MongoDB`<br>
Get source code: `git clone https://github.com/kp255928/cs35l_project`<br>
Get into the project folder: `cd cs35l_project`<br>
Install dependencies with `npm install`<br>
Get in the server: `cd server`<br>
Install server dependency: `npm install` <br>
Go to client cd `../client` <br>
Install client dependency: `npm install`<br>
Start MongoDB<br> - Create your MongoDB Atlas account and put your authentication string into `.env` file(first line) / with ur own cluster <br>

Open two terminals, go to `cs35l_project/client` and do `npm start`<br>
Another one go to `cs35l_project/server` and do `npm start`<br>
Open web browser and go to http://localhost:3000


List of APIs

The application provides below mentioned APIs for creating, editing, deleting, searching the events in the database. In addition passport authentication is used for user log-in/sign-up. The APIs work as an interface between the application and the database.

<!-- Index page: GET /
Signup page: GET /signup
Log-in page: GET /login
Home page: GET /home
User signup: POST /signup
User log-in: POST /login
Get all events: GET /getevents
Get single event: GET /getevent/:id
Create new event: POST /addevent
Search events: POST /searchevents
Update an event: PUT /editevent/:id
Delete an event: DELETE /delevent/:id
Update user info: PUT /edituser
Logout: GET /logout
Request Body Parameters

For user sign-up: *username: String, *password: String

For user log-in: *username: String, *password: String

For creating new event: *startDate: YYYY-MM-DD, *startTime: HH:MM (24 hr format), *description: String

For searching events: startDate: YYYY-MM-DD

For updating an event: startDate: YYYY-MM-DD, startTime: HH:MM (24 hr format), description: String

Date update require both starDate and endDate.

Time update require both startDate and endDate alongwith startTime and endTime.

Description and place can be updated independently.

Request Route Parameters

For fetching an event form database. /getevent/:id
For updating an event in database /editevent/:id
For deleting and event in database. /delevent/:id -->

Nodejs

Nodejs can be downloaded from https://nodejs.org/en/ For Nodejs documentation, please visit https://nodejs.org/en/docs/

MongoDB

MongoDB can be downloaded from https://www.mongodb.com/download-center?jmp=nav#community For MongoDB documentation, please visit https://docs.mongodb.com/?_ga=1.199949294.1991671044.1470738239

Expressjs

“Expressjs” is a framework for “nodejs” to develop RESTful web services. Express generator can be used to generate expressjs projects and get it running with less hassles. For Expressjs API reference, please visit http://expressjs.com/en/4x/api.html

Mongoosejs

Since MongoDB is schema-less, Mongoose provides a straight-forward, schema-based solution for modeling application data with MongoDB. For Mongoosejs API reference, please visit http://mongoosejs.com/docs/api.html

Passportjs

Passport is authentication middleware for Node.js. It can be easily dropped in to any Express-based web application. Username and password based local authentication is used in this project. For Passportjs documentation, please visit http://passportjs.org/docs/overview


View Engine

Embedded JavaScript (ejs) is a client-side templating language and it is used as view engine. For more information, please visit https://www.npmjs.com/package/ejs
