var express = require('express');
var User = require('../models/User');
var router = express.Router();

router.post('/', function (req, res) {
    User.saveUser(req.body, function (err, token) {
        res.send({ id_token: token });
    });
});

router.post('/sessions/create', function (req, res) {
    User.createSession(req.body, function (err, token) {
        res.send({ id_token: token });
    });
});

router.get('/', function (req, res) {
    User.getUsers(function (err, docs) {
        res.send({ users: docs });
    });
});

router.get('/:id', function (req, res) {
    var user_id = req.params.id;
    User.getUser(user_id, function (err, docs) {
        res.send({ user: docs });
    });
});

module.exports = router;