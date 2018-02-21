'use strict';

const mongoose = require('./mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {type: String, required: true, unique: true}
});

const categoryModel = mongoose.model('Category', categorySchema);

exports.CategoryModel = categoryModel;
