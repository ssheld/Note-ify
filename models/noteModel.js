const mongoose = require('mongoose');
require('dotenv').config();

const Schema = mongoose.Schema;

const noteSchema = new Schema ({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

noteSchema.pre('save', function(next) {
    // If createdAt isn't initialized then this is a new user
    if(!this.createdAt) {
        this.createdAt = new Date();
    } else {
        this.createdAt = new Date();
    }
    next();
});

module.exports = mongoose.model('Note', noteSchema);