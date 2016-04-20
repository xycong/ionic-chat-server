var db = require('../db');
var collection = db.get().collection('users');
var jwt = require('../jwt');

exports.saveUser = function (user, callback) {
    if (!user.username || !user.password) {
        // Did not send either username or password
        callback(400, 'You must send the username and the password', null);
    }
    collection.findOne({ 'username': user.username }, function (err, docs) {
        if (docs != null) {
            // User already exists
            callback(400, 'A user with that username already exists', null);
        }
        collection.save(user);
        callback(201, null, jwt.sign(docs));
    });
}

exports.createSession = function (user, callback) {
    if (!user.username || !user.password) {
        // Did not send either username or password
        callback(400, 'You must send the username and the password', null);
    }
    collection.findOne({ 'username': user.username }, function (err, docs) {
        if (docs == null) {
            // User does not exist
            callback(400, 'The username or password do not match', null);
        }
        else if (user.password !== docs.password) {
            // Passwords do not match
            callback(400, 'The username or password do not match', null);
        }
        callback(201, null, jwt.sign(docs));
    })
}


exports.getUsers = function (callback) {
    collection.find().toArray(function (err, docs) {
        callback(err, docs);
    });
}

exports.getUser = function (user_id, callback) {
    collection.findOne({ '_id': user_id }, function (err, docs) {
        callback(err, docs);
    });
}