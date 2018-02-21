'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const productController = require('./src/controllers/productController');
const categoryController = require('./src/controllers/categoryController');
const logger = require('./src/libs/logger')(module);

logger.info(`process.env.port = ${process.env.port}`);
logger.info(`process.env.urlMongodb = ${process.env.urlMongodb}`);

app.use('/products', productController);
app.use('/categories', categoryController);

app.use(express.static(`${__dirname}/public`));
app.listen(process.env.port, () => {
    logger.info(`Listening on port ${process.env.port}`);
});

app.use((err, req, res, next) => {
    logger.error(err);
    res.send(err);
});

app.use((req, res) => {
    res.status(404);
    res.send('Page not found');
});
