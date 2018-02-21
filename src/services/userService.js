'use strict';

const httpErrors = require('../utils/httpErrors');
const {UserModel} = require('../db/productShema');

exports.verifyLogin = (username, password,  cb) => {
    UserModel.findOne({username}, (err, user) => {
        if (err) return cb(err);

        if (!user) return cb(httpErrors.createAuthenticationError('User not found'));
        user.comparePassword(password, (err, matches) => {
            if (err || !matches) return cb(httpErrors.createAuthenticationError('Wrong password'));
            const token = jwt.sign({user}, 'marketsecret');
            cb(null, token);
        });
    });
};

exports.addUser = (obj, cb) => {
    if (!obj.username || !obj.password) return cb(httpErrors.createAuthenticationError('Empty required fields'));
    obj.role = 'User';
    UserModel.create(obj, cb);
};

exports.findAll = (MarketToken, cb) => {
    if (!MarketToken) return cb(httpErrors.createAccessDeniedError('Access denied'));
    UserModel.find({}, cb);
};
