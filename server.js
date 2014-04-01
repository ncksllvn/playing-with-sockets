


var express = require('express');
var app = express();
var server = app.listen(80);
var io = require('socket.io').listen(server);
  

app.use(express.logger());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('public/index');
})

io.sockets.on('connection', function (socket) {
  
  socket.on('my cursor moved', function(data){
  
    socket.broadcast.emit('other cursor moved', data );
    
  });
  
  
});

