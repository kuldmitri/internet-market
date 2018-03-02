const _ = require('lodash');
const ProductModel = require('../db/productShema').ProductModel;
const ObjectID = require("mongodb").ObjectID;

exports.findAll = (cb) => {
    ProductModel.find({}, cb);
};

exports.addNewProduct = (product, cb) => {
    ProductModel.create(product, cb);
};

exports.deleteById = (id, cb) => {
    ProductModel.findByIdAndRemove(id, cb);
};

exports.findByCategoryId = (id, cb) => {
    id = new ObjectID(id);
    ProductModel.find({categoryId: id}, cb);
};

exports.findById = (id, cb) => {
    ProductModel.findById(id, cb);
};

exports.updateProduct = (product, cb) => {
    product.categoryId = new ObjectID(product.categoryId);
    ProductModel.findByIdAndUpdate(product._id, product, cb);
};