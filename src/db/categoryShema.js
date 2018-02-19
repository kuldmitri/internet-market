'use strict';

const mongoose = require('./mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {type: String, required: true, unique: true}
});

const categotyModel = mongoose.model('Category', categorySchema);

exports.CategotyModel = categotyModel;
