# cs35l_project

http://localhost:3000 for client
http://localhost:9000/ for server

To do this project in the terminal, write git clone https://github.com/kp255928/cs35l_project.git in the terminal.
next, type cd cs35l_project 

need to type "npm install" in the project folder in the terminal when you start this project

I Only touched the files:
server/bin
server/datamodel
server/routes
server/.env
server/app.js
others are untouch, generated at the start of the project.


Database connection https://cloud.mongodb.com/v2/60978e5eefa688605caf032c#clusters (don't know how to share cluster yet)

server/.env contains the key for using the database (might need to register ur own account)

Frontend: work on folders in client/src

Backend:

login page is being constructed by Brighton
server/routes contains the node functions and paths to add events or users
server/routes/events.js contains some request to store events into the database. (router.route('/add').post((req, res))
Need to connect this to the front end where it will invoke these requests to the database

server/routes/user.js idk what is this used for, but only for testing for now.

server/datamodel contains the database objects (only two for now - user and events), which are used when making a event or user


TODO: create login page, create some buttons or something in the front end to let user create an event
these buttons will call the backend functions or something to put entries in the database
create calander view.
search function (search from the database, display it in frontend


