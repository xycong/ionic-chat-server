var express = require('express');
var Room = require('../models/Room');
var router = express.Router();

router.get('/join/:user_id', function (req, res) {
    Room.joinOpen(req.params.user_id, function (err, docs) {
        res.send({ room: docs });
    });
});

router.get('/:room_id', function (req, res) {
    Room.getRoom(req.params.room_id, function (err, docs) {
        res.send({ room: docs });
    });
});

router.delete('/:room_id/:user_id', function (req, res) {
    var params = req.params;
    Room.destroyRoom(params.room_id, params.user_id, function (err, docs) {
        res.send({ room: docs });
    });
});

module.exports = router;