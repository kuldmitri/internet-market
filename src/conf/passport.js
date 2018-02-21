'use strict';

const PassportJWT = require('passport-jwt');
const config = require('./index.js');
const {UserModel} = require('../db/userShema');

module.exports = (passport) => {
    const {ExtractJWT, Strategy} = PassportJWT;
    const parameters = {
        secretOrKey: 'marketsecret',
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };

    passport.use(new Strategy(parameters, (payload, done) => {
        UserModel.findOne({id: payload.id}, (err, user) => {
            if (err) return done(err, false);
            if (!user) return done(null, false);

            done(null, user);
        });
    }));
}