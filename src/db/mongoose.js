'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/InternetMarket');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log('connection error:', err.message);
});
db.once('open', () => {
    console.log('Connected to DB!');
});

module.exports = mongoose;