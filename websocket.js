/**
 * Created by lilin on 16/7/23.
 */
var websocketServer = function(httpServer){
    var users = [];
    var io = require('socket.io')(httpServer);
    var cookieUtil = require('cookie');
    io.on('connection', function (socket) {
        var clientCookie = cookieUtil.parse(socket.client.request.headers.cookie);
        var name = clientCookie.name;
        users[name]=1;
        var onlineUsers = [];
        for(var key in users){
            if(users[key]){
                onlineUsers.push(key);
            }
        }
        console.log(onlineUsers);
        io.emit('chat message', {name: name, msg:name+'上线啦!', id: socket.client.id, type:1,users:onlineUsers});
        console.log('message: ' + '[' + socket.client.id + ' ' + name + ']' );

        console.log('a user connected: ' + socket.client.id);
        socket.on('disconnect', function () {
            delete users[name];
            console.log('user disconnected: ' + socket.client.id);
            socket.broadcast.emit('chat message', {name: name, msg:name + '下线啦!', id: socket.client.id, type:2});
        });
        socket.on('chat message', function (msg) {
            var clientCookie = cookieUtil.parse(socket.client.request.headers.cookie);
            var name = decodeURIComponent(clientCookie.name);
            io.emit('chat message', {name: name, msg:msg, id: socket.client.id, type:3});
            console.log('message: ' + '[' + socket.client.id + ' ' + name + ']' + msg);
        });
    });
};
module.exports=websocketServer;
