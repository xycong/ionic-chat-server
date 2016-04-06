var io = require ('socket.io'),
    http = require('http'),
    server = http.createServer();
    io = io.listen(server);

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

io.on('connection', function(socket) {
    console.log('a user connected');
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    })
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});