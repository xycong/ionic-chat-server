var jwt = require('jsonwebtoken');
var config = require('./config');

exports.sign = function(obj) {
    var token = jwt.sign(obj, config.secret, {
        expiresIn: 60*60*24
    });
    
    return token;
}

exports.auth = function(token, callback) {
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            return null;
        } else {
            callback(decoded);
        }
    });
}