const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Note = mongoose.model('Note')

router.get('/', (req, res) => {
    res.render("note/CreateOrUpdate", {
        viewTitle : "Insert todo task!"
    })
});

router.post('/', (req, res) => {
    // if it has no id, its an insert, if it has id, its an update.
    if(req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function updateRecord(req, res){
    Note.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true, useFindAndModify: false},(err, doc) => {
        console.log(req.body);
        if(!err) { res.redirect('note/list'); }
        else {
            if (err.name == 'ValidationError'){
                handleValidationErr(err, req.body);
                res.render("note/CreateOrUpdate", {
                    note: req.body,
                    viewTitle: "Update todo note!"
                });
            }
            else
                console.log('Something went wrong during todo update! : ' + err);
        }
    });
}

// Insert record into Note mongoose model, save. Then redirect to list, if any errors return to create view.
function insertRecord(req, res) {
    var note = new Note();
    note.fullName = req.body.fullName;
    note.assigned = req.body.assigned;
    note.todoContent = req.body.todoContent;
    note.createDate = req.body.createDate;
    note.finishDate = req.body.finishDate;
    note.save((err, doc) => {
        if (!err)
            res.redirect('note/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationErr(err, req.body);
                res.render("note/CreateOrUpdate", {
                    //viewTitle: "Create todo note!",
                    note: req.body
                });
            }
            else
                console.log('Error during todo insertion : ' + err);
        }
    });
}

// GET list, then render list in note/list. if not, complain.
router.get('/list', (req, res) => {
    Note.find((err, docs) => {
        if(!err){
            res.render("note/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving list of todo notes :' + err);
        }
    })

});

// get todo note by id.
router.get('/:id', (req, res) => {
    Note.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("note/CreateOrUpdate", {
                viewtitle: "Update todo.",
                note: doc
            });
        }
    });
});

// take the post in question, delete by id using the mongoose findByIdAndRemove then redirect back to list view.
router.get('/delete/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err, doc) => {
        if(!err) {
                res.redirect("/note/list"); 
            }
            else { console.log('Error during Todo-note deletion : ' + err); }
    });
})

// testing some validation of fields.
function handleValidationErr(err, body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'todoContent':
                body['todoContentError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;