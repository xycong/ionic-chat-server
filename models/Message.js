var db = require('../db');
var collection = db.get().collection('messages');

exports.getMessages = function (board_id, callback) {
    collection.find({ 'board_id': board_id }).sort({
        created_on: -1
    }).limit(30).toArray(function (err, docs) {
        callback(err, docs);
    });
}

exports.saveMessage = function (board_id, message) {
    message.board_id = board_id;
    message.created_on = new Date();
    collection.save(message);
}