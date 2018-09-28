const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, function() {
        console.log('listen to port 4000');
});

app.use(express.static('public'));

// setup

let io = socket(server);

io.on('connection', function(socket) {
        console.log('made a connection');

        socket.on('chat', function(data) {
                io.sockets.emit('chat', data);
        });

        socket.on('typing', function(data) {
                socket.broadcast.emit('typing', data);
        });

});