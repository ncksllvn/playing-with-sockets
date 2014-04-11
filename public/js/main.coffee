class Cursor
    constructor: (user) ->
        [@id, @x, @y] = [user.id, user.x, user.y] if user?
        @marker = @__marker__.clone()
        @update()
        
    __marker__: (->
        marker = new Path.Circle({ radius: 10, center: [-100, -100] })
        marker.strokeColor = 'black'
        marker
        )()
        
    update: (x, y) ->
        @x = x if x
        @y = y if y
        @marker.position = new Point @x, @y 
    
    remove: ->
        @__marker__.remove()
        
    toJSON: ->
        { id: @id, x: @x, y: @y }
        
me = new Cursor
users = {}
socket = io.connect 'http://localhost'

socket.on 'users', (usersInit) ->
    
    users[id] = new Cursor(user) for id, user of usersInit
            
    socket.on 'users:joined', (user) ->
        users[user.id] = new Cursor(user)
        
    socket.on 'users:left', (id) ->
        users[id].remove()
        delete users[id]
    
    socket.on 'users:moved', (user) ->
        users[user.id].update user.x, user.y 
    
paper.tools[0] = new Tool
paper.tool.onMouseMove = (e) ->
    me.update e.point.x, e.point.y
    socket.emit 'users:moved', me.toJSON()