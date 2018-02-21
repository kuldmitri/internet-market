'use strict';

const mongoose = require('mongoose');
const logger = require('../libs/logger')(module);

mongoose.connect(process.env.urlMongodb);
const db = mongoose.connection;

db.on('error', (err) => {
    logger.error('connection error:', err.message);
});
db.once('open', () => {
    logger.info('Connected to DB!');
});

module.exports = mongoose;