const _ = require('lodash');
const CategoryModel = require('../db/categoryShema').CategoryModel;

exports.findAll = (cb) => {
    CategoryModel.find({}, cb);
};

exports.addNewProduct = (product, cb) => {
    CategoryModel.create(product, cb);
};

exports.deleteById = (id, cb) => {
    CategoryModel.findByIdAndRemove(id, cb);
};

exports.findById = (id, cb) => {
    CategoryModel.findById(id, cb);
};

exports.updateProduct = (product, cb) => {
    CategoryModel.findByIdAndUpdate(product.id, product, cb);
};