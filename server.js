var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server Hosted on Heroku\n');
});

var numUsers = 0;
var users = [];
var rooms = [];

io.sockets.on('connection', function(socket) {
    var addedUser = false;
    
    // DONE
    socket.on('add user', function(username) {
        if (addedUser) return;

        socket.username = username;
        users.push(username);
        console.log(users);
        ++numUsers;
        addedUser = true;
    });
    
    socket.on('subscribe', function(room) {
        console.log('subscribe');
        socket.join(room);
        if (rooms.indexOf(room) === -1) {
            rooms.push(room);
        }
        console.log(rooms);
        // Todo - get history
        socket.broadcast.to(room).emit('updatechat', 'user has joined room');
    });

    socket.on('unsubscribe', function(room) {
        console.log('unsubscribe');
        socket.leave(room);
        if (io.sockets.adapter.rooms[room].length === 0) {
            var index = rooms.indexOf(room);
            rooms.splice(index, 1);
        }
        console.log(rooms);
        socket.broadcast.to(room).emit('updatechat', 'user has left room');
    });

    socket.on('message', function(data) {
        console.log('message');
        io.in(data.room).emit('message', {
            username: socket.username,
            message: data.message
        });
    });

    socket.on('typing', function() {
        io.in(data.room).emit('isTyping', { username: socket.username });
    });

    socket.on('stop typing', function() {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    socket.on('disconnect', function() {
        console.log('disconnect');
        if (addedUser) {
            --numUsers;
            var index = users.indexOf(socket.username);
            users.splice(index, 1);
            console.log(users);
        }
    });
});

var listener = server.listen(process.env.PORT, function() {
    console.log('Listening on port ' + server.address().port);
});

module.exports = app;