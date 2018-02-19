'use strict';

const mongoose = require('./mongoose');
const {Schema} = mongoose;

const purchaseSchema = new Schema({
    count: {type: Number, required: true},
    totalPrice: {type: Number},
    productId: {type: Schema.ObjectId, required: true}
});

const purchaseModel = mongoose.model('Purchase', purchaseSchema);

exports.PurchaseModel = purchaseModel;
