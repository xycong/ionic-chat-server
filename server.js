var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var cors = require('cors');
var errorhandler = require('errorhandler');
var dotenv = require('dotenv');
var server = http.createServer(app);
var io = require('socket.io')(server);
var db = require('./db');
var topics = require('./models/Topic');
// var mongoURL = 'mongodb://127.0.0.1/discord';
var mongoURL = 'mongodb://root:root@ds013931.mlab.com:13931/discord';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorhandler());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server Hosted on Heroku\n');
});

db.connect(mongoURL, function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Database connection ready');
    app.use('/users', require('./controllers/user'));
    app.use('/rooms', require('./controllers/room'));

    io.sockets.on('connection', function (socket) {
        console.log('connected: ' + socket.id);

        socket.on('subscribe', function (data) {
            var room_id = data.room_id;
            socket.join(room_id);
            var room = io.sockets.adapter.rooms[room_id];
            if (room.length == 2) {
                console.log('Server ready');
                io.to(room_id).emit('ready');
            }
        });

        socket.on('user', function (data) {
            var room_id = data.room_id;
            socket.broadcast.to(room_id).emit('share user', data.user);
        });

        socket.on('message', function (data) {
            var room_id = data.room_id;
            io.to(room_id).emit('message', {
                user_id: data.user_id,
                message: data.message,
                timestamp: data.timestamp
            });
        });

        socket.on('reconnect', function (data) {
            var room_id = data.room_id;
            io.broadcast.to(room_id).emit('reconnect');
        });

        socket.on('unsubscribe', function (data) {
            var room_id = data.room_id;
            socket.leave(room_id);
        });

        socket.on('help', function (data) {
            var room_id = data.room_id;
            io.to(room_id).emit('topic', topics.generateTopic());
        })
    });

    var port = process.env.PORT || 3000;
    var listener = server.listen(port, function () {
        console.log('Listening on port ' + server.address().port);
    });
});

module.exports = app;