var db = require('../db');
var collection = db.get().collection('rooms');
var ObjectID = require('mongodb').ObjectID;

exports.joinOpen = function (user_id, callback) {
    console.log('In joinOpen');
    collection.findOneAndUpdate({ users: { $size: 1 } },
        { $push: { users: user_id } },
        {
            returnOriginal: false,
            upsert: true
        }
        , function (err, docs) {
            callback(err, docs);
        });
}

exports.getRoom = function (room_id, callback) {

    collection.findOne({ _id: ObjectID(room_id) }, function (err, docs) {
        callback(err, docs);
    });
}

exports.removeUser = function (room_id, id, callback) {
    console.log('In here');
    console.log(id);
    collection.findOneAndUpdate({ _id: ObjectID(room_id) },
        { $pull: { users: id } },
        {
            returnOriginal: false,
        }, function (err, docs) {
            callback(err, docs);
        });
}