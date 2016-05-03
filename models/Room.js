var db = require('../db');
var collection = db.get().collection('rooms');
var User = require('./User');
var ObjectID = require('mongodb').ObjectID;

exports.joinOpen = function (user_id, callback) {
    collection.findOneAndUpdate({ users: { $size: 1 } },
        { $push: { users: user_id } },
        {
            returnOriginal: false,
            upsert: true
        },
        function (err, room) {
            callback(err, room);
        });
}

exports.getRooms = function (callback) {
    collection.find().toArray(function (err, docs) {
        callback(err, docs);
    });
}

exports.getRoom = function (room_id, callback) {
    collection.findOne({ _id: ObjectID(room_id) }, function (err, docs) {
        callback(err, docs);
    });
}

exports.destroyRoom = function (room_id, id, callback) {
    console.log('In here');
    console.log(id);
    collection.findOneAndDelete({ _id: ObjectID(room_id) },
        function (err, docs) {
            callback(err, docs);
        });
}