var db = require('../db');
var collection = db.get().collection('users');
var jwt = require('../jwt');
var haikunate = require('haikunator');
var ObjectID = require('mongodb').ObjectID;

exports.saveUser = function (user, callback) {
    console.log(user);
    if (!user.username || !user.password) {
        // Did not send either username or password
        callback('You must send the username and the password', null);
    }
    collection.findOne({ 'username': user.username }, function (err, docs) {
        if (docs != null) {
            // User already exists
            callback('A user with that username already exists', null);
        }

        var display_name = haikunate({ tokenLength: 0, delimiter: "" });
        user.display_name = display_name;
        user.points = 0;
        collection.save(user, function (err, results) {
            console.log('New user!');
            console.log(results);
            callback(null, jwt.sign(results.ops[0]));
        });
    });
}

exports.createSession = function (user, callback) {
    console.log(user);
    // if (!user.username || !user.password) {
    //     // Did not send either username or password
    //     callback('You must send the username and the password', null);
    // }
    // collection.findOne({ 'username': user.username }, function (err, docs) {
    //     if (docs == null) {
    //         // User does not exist
    //         callback('The username or password is incorrect', null);
    //     }
    //     else if (user.password != docs.password) {
    //         callback('The username or password is incorrect', null);
    //     }
    // });
    collection.findAndModify(
        { username: user.username },     // query
        [],               // represents a sort order if multiple matches
        { $set: { socket_id: user.socket_id } },   // update statement
        { new: true },    // options - new to return the modified document
        function (err, doc) {
            if (doc.value == null) {
                callback('The username or password is incorrect', null);
            }
            else if (user.password != doc.value.password) {
                callback('The username or password is incorrect', null);
            }
            else {
                callback(null, jwt.sign(doc.value));
            }
        }
    );
}

exports.getUsers = function (callback) {
    collection.find().toArray(function (err, docs) {
        callback(err, docs);
    });
}

exports.getUser = function (user_id, callback) {
    collection.findOne({ _id: ObjectID(user_id) }, function (err, docs) {
        callback(err, docs);
    });
}