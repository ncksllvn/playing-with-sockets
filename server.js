(function() {
  var app, express, id, io, server, users;

  express = require('express');

  app = express();

  server = app.listen(80);

  io = require('socket.io').listen(server);

  app.use(express.logger());

  app.use(express["static"](__dirname + '/public'));

  app.get('/', function(req, res) {
    return res.render('public/index');
  });

  users = {};

  id = 0;

  io.sockets.on('connection', function(socket) {
    var user;
    socket.emit('users', users);
    user = {
      id: id++
    };
    users[user.id] = user;
    socket.broadcast.emit('users:joined', user);
    socket.on('users:moved', function(data) {
      user.x = data.x;
      user.y = data.y;
      return socket.broadcast.emit('users:moved', user);
    });
    return socket.on('disconnect', function() {
      socket.broadcast.emit('users:left', user.id);
      return delete users[user.id];
    });
  });

}).call(this);
