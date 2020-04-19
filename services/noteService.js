const Note = require('../models/noteModel');

class NoteService {

    static create(obj) {
        const note = new Note(obj);
        return note.save();
    }

    static update(id, data) {
        return Note.findById(id)
        .then(note => {
            note.set(data);
            note.save();
            return note;
        });
    }

    static find(id) {
        return Note.findById(id)
        .then(note => {
            return note;
        });
    }

    static list() {
        return Note.find({})
        .then(notes => {
            return notes;
        });
    }

    static delete(id) {
        return Note.deleteOne({_id: id})
        .then(obj => {
            return obj;
        });
    }
}

module.exports = NoteService;