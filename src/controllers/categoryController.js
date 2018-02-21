const router = require('express').Router();
const categoryService = require('../services/categorytService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/all', jsonParser, (req, res, next) => {
    categoryService.findAll((err, products) => {
        if (err) return next(err);
        res.send(products);
    });
});

router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    categoryService.deleteById(id, (err, products) => {
        if (err) return next(err);
        res.send(products);
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    categoryService.findById(id, (err, products) => {
        if (err) return next(err);
        res.send(products);
    });
});

router.post('/add', jsonParser, (req, res, next) => {
    categoryService.addNewProduct(req.body.product, (err, product) => {
        if (err) return next(err);
        res.send({product});
    });
});

router.post('/update', jsonParser, (req, res, next) => {
    categoryService.updateProduct(req.body.product, (err, product) => {
        if (err) return next(err);
        res.send({product});
    });
});

module.exports = router;