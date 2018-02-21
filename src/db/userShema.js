'use strict';

const mongoose = require('./mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['Admin', 'User'], required: true},
    firstName: {type: String},
    lastName: {type: String}
});

Schema.pre('save', function (next) {
    const user = this;
    if (!this.isNew && !this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

Schema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, (err, matches) => {
        if (err) return next(err);
        next(null, matches);
    });
};

const UserModel = mongoose.model('User', UserSchema);

exports.UserModel = UserModel;
