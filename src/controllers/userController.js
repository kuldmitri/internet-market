const router = require('express').Router();
const userService = require('../services/userService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');

router.post('/login', jsonParser, (req, res, next) => {
    userService.verifyLogin(req.body.username, req.body.password, (err, user) => {
        if (err) return next(err);
        res.send({user});
    });
});

router.post('/verifyToken', jsonParser, (req, res, next) => {
    if (!req.headers && !req.headers.authorization) {
        res.send({});
    }
    const split = req.headers.authorization.split(' ');
    if (split.length === 2) res.send({token: split[1]});
});

router.post('/signup', jsonParser, (req, res, next) => {
    userService.addUser(req.body, (err, user) => {
        if (err) return next(err);
        res.send({user});
    });
});

router.get('/all', jsonParser, (req, res, next) => {
    passport.authenticate('jwt', {session: false});
    userService.findAll((err, users) => {
        if (err) return next(err);
        res.send(users);
    });
});

module.exports = router;