const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('./config/db');

var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/notes', notesRouter)

// Throw a 404 error if page does not exist
app.use('*', (req, res) => {
  res.render('404', {
    title: 'Note-ify app',
  });
});

module.exports = app;
