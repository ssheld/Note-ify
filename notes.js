const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.bold.blue('Your Notes:'));
    
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title.toLowerCase() === title.toLowerCase());

    if (note) {
        console.log(chalk.bold.blue(note.title))
        console.log(chalk.bold.green(note.body));
    } else {
        console.log(chalk.red.bold('Error: No note found.'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const filteredNotes = notes.filter(note => note.title.toLowerCase() !== title.toLowerCase());

    if (notes.length === filteredNotes.length) {
        console.log(chalk.bgRed('No note found!'));
    } else {
        saveNotes(filteredNotes);
        console.log(chalk.bgGreen('Note removed!'));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title.toLowerCase() === title.toLowerCase());

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
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
    readNote: readNote,
    addNote: addNote,
    listNotes: listNotes,
    removeNote: removeNote
}