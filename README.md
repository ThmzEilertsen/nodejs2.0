# nodejs2.0 Work-project.

Create Node.js CRUD RESTapi. \
  Should Support: \
    - Create \
    - Read \
    - Update \
    - Delete 

Tools used : \
 express - https://www.npmjs.com/package/express \
 express-handlebars - https://www.npmjs.com/package/express-handlebars \
 handlebars - https://www.npmjs.com/package/handlebars \
 body-parser - https://www.npmjs.com/package/body-parser \
 mongoose - https://www.npmjs.com/package/mongoose \
 mongoDB - https://www.mongodb.com/

To run : \
Start MongoDB on default port 27017 - easy monitoring can be done with MongoDB Compass \
  (you might have to create a database in mongoDB, with name "NotesDB" with a collection "notes". -> NotesDB.notes)\
  This is very easy with mongoDB Compass. ! Case sensitive ! \
Run server with : node server.js - runs on port 3000 \
navigate to http://localhost:3000/note/ - Create todo note. \
navigate to http://localhost:3000/note/list - See all todo notes. \
