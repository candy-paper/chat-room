/**
 * Created by lilin on 16/7/17.
 */

var express = require('express');
var app =  express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieUtil = require('cookie');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected: ' + socket.client.id);
    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.client.id);
    });
    socket.on('chat message', function (msg) {
        var clientCookie = cookieUtil.parse(socket.client.request.headers.cookie);
        var name = decodeURIComponent(clientCookie.name);
        io.emit('chat message', {name: name, msg:msg, id: socket.client.id});
        console.log('message: ' + '[' + socket.client.id + ' ' + name + ']' + msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

