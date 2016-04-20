var express = require('express');
var router = express.Router();
var Board = require('../models/Board');
var Message = require('../models/Message');

router.get('/', function (req, res) {
    Board.getBoards(function (err, docs) {
        res.send({ boards: docs });
    })
});

router.post('/:id', function (req, res) {
    var user_id = req.params.id;
    Board.saveBoard(user_id, req.body);
});

router.get('/:id', function (req, res) {
    var user_id = req.params.id;
    Board.getBoard(user_id, function (err, docs) {
        res.send({ board: docs });
    });
});

router.delete('/:id', function (req, res) {
    var board_id = req.params.id;
    Board.deleteBoard(board_id);
});

router.get('/:id/messages', function (req, res) {
    var board_id = req.params.id;
    Messages.getMessages(board_id, function (err, docs) {
        res.send({ messages: docs });
    });
});

router.post('/:id/messages', function(req, res) {
    var board_id = req.params.id;
    Messages.saveMessage(board_id, req.body);
});
module.exports = router;