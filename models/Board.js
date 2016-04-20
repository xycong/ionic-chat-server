var db = require('../db');
var collection = db.get().collection('boards');

exports.getBoards = function (callback) {
    collection.find().sort({
        created_on: -1
    }).toArray(function (err, docs) {
        callback(err, docs);
    });
}

exports.getBoard = function (user_id, callback) {
    collection.findOne({ 'user_id': user_id }, function (err, docs) {
        callback(err, docs);
    });
}

exports.deleteBoard = function (board_id) {
    collection.deleteOne({ '_id': ObjectId(board_id) });
}

exports.saveBoard = function (user_id, board) {
    board.user_id = user_id;
    board.created_on = new Date();
    collection.save(board);
}

