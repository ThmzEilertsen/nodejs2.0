const mongoose = require('mongoose');

// Connect to mongoDB backend using mongoose, running on default host 27017 with the allready generated "NotesDB" with the collection "notes"
mongoose.connect('mongodb://localhost:27017/NotesDB', { useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    if (!err) { 
        console.log('MongoDB Connection Succeeded.')}
    else { 
        console.log('Connection to mongoDB could not be made: ' + err) }
});

require('./note.model');