'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const productController = require('./src/controllers/productController');
const categoryController = require('./src/controllers/categoryController');

app.use('/products', productController);
app.use('/categories', categoryController);

app.use(express.static(`${__dirname}/public`));
app.listen(3000, () => {
    console.log('Listen port 3000')
});

app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
});

app.use((req, res) => {
    res.status(404);
    res.send('Page not found');
    console.log(req);
});
