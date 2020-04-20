const mongoose = require('mongoose');
require('../models/noteModel');
require('dotenv').config();

var dbURL =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0-7zngf.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(dbURL, {useNewUrlParser: true})
    .catch(err => {
        console.error(`Error connecting to database: ${err}`);
        process.exit();
    });

mongoose.connection.on('connected', () => {
    console.log('Mongoose successfully connected to db.');
});

mongoose.connection.on('error', err => {
    console.error(`Connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose successfully disconnected from db.');
});

// Function to close Mongoose connection
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Database disconnected by ${msg}`);
    });
};

// Listen for when nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Listen for app termination
process.on('SIGINT', () => {
    gracefulShutdown('Application terminated.', () => {
        process.exit(0);
    });
});

// module.exports = initiateMongoServer;