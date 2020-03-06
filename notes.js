const fs = require('fs')

const getNotes = function () {
    return 'Your notes...'
}

const removeNote = function(title) {
    const notes = loadNotes();

    const index = notes.findIndex(note => note.title.toLowerCase() === title.toLowerCase());

    if (index === -1) {
        console.log('Could not find the title you specified.');
    } else {
        console.log('Removing note: ' + JSON.stringify(notes[index]));
        notes.splice(index, 1);
        saveNotes(notes);
    }
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        console.log('dataJSON is ' + dataJSON);
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}