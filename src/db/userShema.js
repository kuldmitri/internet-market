'use strict';

const mongoose = require('./mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['Admin', 'User'], required: true},
    firstName: {type: String},
    lastName: {type: String}
});

const UserModel = mongoose.model('User', UserSchema);

exports.UserModel = UserModel;
