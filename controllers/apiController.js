const noteService = require('../services/noteService');

module.exports = {
    async setAccessControls(req, res, next) {
        res.set({
            // allow any domain, allow REST methods we've implemented
            'Access-Control-Allow-Origin':'*',
            // Specifies methods allowed when accessing our resource.
            // Used in response to preflight request.
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
            // Specifies list of acceptable headers
            "Access-Control-Allow-Headers": "Content-Type"
        });
        if (req.method == 'OPTIONS'){
            return res.status(200).end();
        }
        next();
    },

    async findAllNotes(req, res, next) {
        try {
            const notes = await noteService.list();
            res.status(200);
            res.json(notes);
        } catch(e) {
            console.log(e.message);
            res.status(404).end();
        }
    },
    
    async createNote({body}, res, next) {
        const noteData = {
            author: body.author,
            title: body.title,
            comment: body.comment
        };

        try {
            const savedNote = await noteService.create(noteData);
            res.status(201);
            res.json(savedNote);
        } catch(e) {
            console.log(e.message);
            res.status(500).end();
        }
    },

    async findNote({params}, res, next) {
        try {
            const note = await noteService.find(params.noteid);
            res.status(200);
            res.json(note);
        } catch(e) {
            console.log(e.message);
            res.status(404).end();
        }
    },

    async deleteNote({params}, res, next) {
        try {
            const deletedNote = await noteService.delete(params.noteid);
            res.status(200);
            res.json(deletedNote);
        } catch(e) {
            console.log(e.message);
            res.status(404).end();
        }
    },

    async updateNote(req, res, next) {
        const data = {
            author: req.body.author,
            title: req.body.title,
            comment: req.body.comment
        }

        try {
            const updatedNote = await noteService.update(req.params.noteid, data);
            res.status(200);
            res.json(updatedNote);
        } catch(e) {
            console.log(e.message);
            res.status(404).end();
        }
    }
};