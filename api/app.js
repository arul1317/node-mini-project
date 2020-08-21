const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routing');
const app = express();

app.use(express.json());
app.use(router);

const url = 'mongodb://localhost/mini';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('New Connection...')
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

app.listen(8080, () => console.log('Listening to port 8080'));