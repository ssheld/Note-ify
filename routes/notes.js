const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');
const noteController = require('../controllers/noteController');

// Route to find all notes
router.get('/', noteController.findAllNotes);


// Route to save a new note
router.post('/', noteController.createNote);

// Route to update note page
router.get('/:noteid', (req, res, next) => {
    Note.findById(req.params.noteid)
      .then((note) => {
        res.render('update', {note: note});
      }).catch((err) => {
          if (err) {
            console.log(err);
            throw new Error('NoteFindError', note);
          }
      });
});

// Route to delete note
router.post('/:noteid', (req, res, next) => {
    Note.findByIdAndRemove(req.params.noteid)
      .then(() => {
          res.redirect('/');
      })
      .catch((err) => {
          if (err) {
              console.log(err);
              throw new Error('NoteDeleteError', Note.findById(noteid));
          }
      })
});

// Route to update note
router.post('/update_note/:noteid', (req, res, next) => {
    Note.findById(req.params.noteid)
      .then((note) => {
          var data = {
              author: req.body.author,
              title: req.body.title,
              comment: req.body.comment
          }
          note.set(data);
          note.save().then(() => {
            res.redirect('/');
          });
      }).catch((err) => {
          if (err) {
              console.log(err);
              throw new Error('NoteUpdateError', note);
          }
      })
});

// Error Handling
router.use(function(err, req, res, next) {
    console.log(err.stack);
    if(err.message == 'NoteUpdateError') {
        res.redirect('/');
    } else if (err.message == 'NoteDeleteError') {
        res.redirect('/');
    } else if (err.message == 'NoteFindError') {
        res.rediret('/');
    } else if (err.message == 'NoteSaveError') {
        res.redirect('/');
    } else {
        next(err);
    }
});

module.exports = router;