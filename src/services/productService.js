const _ = require('lodash');
const ProductModel = require('../db/productShema').ProductModel;

exports.findAll = (cb) => {
    ProductModel.find({}, cb);
};

exports.addNewProduct = (product, cb) => {
    ProductModel.create(product, cb);
};

exports.deleteById = (id, cb) => {
    ProductModel.findByIdAndRemove(id, cb);
};