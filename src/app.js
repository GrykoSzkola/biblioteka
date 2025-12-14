const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const MONGODB_URI = 'mongodb://localhost:27017';

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let db;

MongoClient.connect(MONGODB_URI)
    .then(client => {                       
    db = client.db('library');
    app.locals.db = db;
    console.log('polaczono z MongoDB');
});

const bookRoutes = require('./routes/books');
app.use('/', bookRoutes);

module.exports = app;