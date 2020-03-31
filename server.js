// require the db files which tells us where to connect to our backend persistent storage.
require('./models/db');

// using express to handle 
const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const expresshbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser');

const noteController = require('./controllers/noteController');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, '/static')))

app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', expresshbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars), extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express server started at port: ${port}...`);
});

app.use('/note', noteController);