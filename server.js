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
var mongoURL = 'mongodb://127.0.0.1/discord';

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
        socket.on('say to someone', function(id, msg){
            socket.broadcast.to(id).emit('message', msg);
        });
        
        socket.on('message', function (data) {
            console.log(data);
            io.emit('message', data.message);
        });
    });

    var port = process.env.PORT || 3000;
    var listener = server.listen(port, function () {
        console.log('Listening on port ' + server.address().port);
    });
});

module.exports = app;