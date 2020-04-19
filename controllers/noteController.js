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
            res.sendStatus(500) && next(error);
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
            res.sendStatus(500) && next(error);
        }
    }

}