'use strict';

const mongoose = require('./mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type: String, required: true, unique: true},
    categoryId: {type: Schema.ObjectId, required: true},
    price: {type: Number, required: true},
    count: {type: Number, required: true}

});

const productModel = mongoose.model('Product', productSchema);

exports.ProductModel = productModel;
