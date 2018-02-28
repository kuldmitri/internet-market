const router = require('express').Router();
const categoryService = require('../services/categoryService');
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
    categoryService.addNewCategory(req.body, (err, product) => {
        if (err) return next(err);
        res.send({product});
    });
});

router.post('/update', jsonParser, (req, res, next) => {
    categoryService.updateCategory(req.body, (err, product) => {
        if (err) return next(err);
        res.send({product});
    });
});

module.exports = router;