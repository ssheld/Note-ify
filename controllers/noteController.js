const noteService = require('../services/noteService');

module.exports = {
    async findAllNotes(req, res, next) {
        try {
            const notes = await noteService.list();
            res.render('index', {
                title: 'Note-ify',
                notes: notes
            });
        } catch(e) {
            console.log(e.message);
            res.redirect('/');
        }
    },
    
    async createNote({body}, res, next) {
        const noteData = {
            author: body.author,
            title: body.title,
            comment: body.comment
        };

        try {
            await noteService.create(noteData);
            res.redirect('/');
        } catch(e) {
            console.log(e.message);
            res.redirect('/');
        }
    },

    async findNote({params}, res, next) {
        try {
            const note = await noteService.find(params.noteid);
            res.render('update', {
                title: 'Note-ify',
                note: note
            });

        } catch(e) {
            console.log(e.message);
            res.redirect('/');
        }
    },

    async deleteNote({params}, res, next) {
        try {
            await noteService.delete(params.noteid);
            res.redirect('/');
        } catch(e) {
            console.log(e.message);
            res.redirect('/')
        }
    },

    async updateNote(req, res, next) {
        const data = {
            author: req.body.author,
            title: req.body.title,
            comment: req.body.comment
        }

        try {
            await noteService.update(req.params.noteid, data);
            res.redirect('/');

        } catch(e) {
            console.log(e.message);
            res.redirect('/')
        }
    }
};