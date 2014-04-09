

var express = require('express');
var app = express();
var server = app.listen(80);
var io = require('socket.io').listen(server);
var _ = require('underscore');

app.use(express.logger());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('public/index');
});

var users = {};
var id = 0;

io.sockets.on('connection', function (socket) {

    socket.emit('users', users);
    
    var user = { id: id++ };
    
    users[user.id] = user;
    
    socket.broadcast.emit('users:joined', user);
    
    socket.on('users:moved', function(data){
        user.x = data.x;
        user.y = data.y;
        socket.broadcast.emit('users:moved', user);
    });
    
    socket.on('disconnect', function(){
        socket.broadcast.emit('users:left', user.id);
        delete users[user.id];
    });
    
    
  
});

