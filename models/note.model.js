const mongoose = require('mongoose');


// Define noteSchema model ie. content.
var noteSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Name of task creator must be provided.'
    },
    assigned: {
        type: String,
        required: 'Name of assigned person must be provided.'
    },
    todoContent: {
        type: String,
        required: 'todo content must be provided.'
    },
    createDate: {
        type: Date,
        get: d => d ? d.toISOString().slice(0, 10) : ""
    },
    finishDate: {
        type: Date,
        get: d => d ? d.toISOString().slice(0, 10) : ""
    },
    status: {
        type: Boolean,
        default: false,
    }

});

// create mongoose model object from noteSchema
mongoose.model('Note', noteSchema);
