'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const passportConfig = require('./passport')(passport);
const jwt = require('jsonwebtoken');
const productController = require('./src/controllers/productController');
const categoryController = require('./src/controllers/categoryController');
const userController = require('./src/controllers/userController');

app.use('/products', productController);
app.use('/categories', categoryController);
app.use('/users', userController);

app.use(express.static(`${__dirname}/public`));
app.listen(3000, () => {
    console.log('Listen port 3000')
});
app.use(passport.initialize());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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
