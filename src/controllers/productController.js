const router = require('express').Router();
const productService = require('../services/productService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/all', jsonParser, (req, res, next) => {
    productService.findAll((err, products) => {
        if (err) return next(err);
        res.send(products);
    });
});

router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    productService.deleteById(id, (err, products) => {
        if (err) return next(err);
        res.send(products);
    });
});

router.get('/find/:id', (req, res, next) => {
    const id = req.params.id;
    productService.findById(id, (err, products) => {
        if (err) return next(err);
        res.send(products);
    });
});

router.get('/findCategory/:id', (req, res, next) => {
    const id = req.params.id;
    productService.findByCategoryId(id, (err, products) => {
        if (err) return next(err);
        res.send(products);
    });
});

router.post('/add', jsonParser, (req, res, next) => {
    productService.addNewProduct(req.body.product, (err, product) => {
        if (err) return next(err);
        res.send({product});
    });
});

router.post('/update', jsonParser, (req, res, next) => {
    productService.updateProduct(req.body.product, (err, product) => {
        if (err) return next(err);
        res.send({product});
    });
});

module.exports = router;