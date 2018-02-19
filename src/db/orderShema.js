'use strict';

const mongoose = require('./mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    userId: {type: Schema.ObjectId, required: true},
    state: {type: Number, required: true},
    issueDate: {type: Date, required: true},
    completeDate: {type: Date, required: true},
    totalPrice: {type: Number},
    purchases: [{type: Schema.ObjectId, ref: 'Purchase'}]
});

const orderModel = mongoose.model('Order', orderSchema);

exports.OrderModel = orderModel;
