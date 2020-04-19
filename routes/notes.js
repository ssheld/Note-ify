const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Route to find all notes
router.get('/', noteController.findAllNotes);

// Route to update note page
router.get('/:noteid', noteController.findNote);

// Route to save a new note
router.post('/', noteController.createNote);

// Route to delete note
router.post('/:noteid', noteController.deleteNote);

// Route to update note
router.post('/update_note/:noteid', noteController.updateNote);

module.exports = router;