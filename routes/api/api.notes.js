const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/apiController');

// Set up route middleware
router.use(apiController.setAccessControls);

// Route to get all notes
router.get('/', apiController.findAllNotes);

// Route to get a single note
router.get('/:noteid', apiController.findNote);

// Route to create note
router.post('/', apiController.createNote);

// Route to update a note
router.put('/:noteid', apiController.updateNote);

// Route to delete a note
router.delete('/:noteid', apiController.deleteNote);

module.exports = router;