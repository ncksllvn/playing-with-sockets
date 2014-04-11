express = require 'express'
app = express()
server = app.listen 80
io = require('socket.io').listen server

app.use express.logger()

app.use express.static __dirname + '/public';

app.get '/', (req, res)->
    res.render 'public/index'

users = {}
id = 0

io.sockets.on 'connection', (socket) ->

    socket.emit 'users', users
    
    user = 
        id: id++
    
    users[user.id] = user
    
    socket.broadcast.emit 'users:joined', user
    
    socket.on 'users:moved', (data)->
        [user.x, user.y] = [data.x, data.y]
        socket.broadcast.emit 'users:moved', user
        
    socket.on 'disconnect', ->
        socket.broadcast.emit 'users:left', user.id
        delete users[user.id]
