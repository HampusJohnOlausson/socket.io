const path = require('path');
const http = require('http');
const express = require("express");
const PORT = process.env.PORT || 3000;
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static('./public'));

//Run when client connect
io.on('connection', socket => {
  console.log("new websocket connection");

  socket.emit("message", "welcome to chat");

  // Broadvast when a user connnects
    socket.broadcast.emit('message', 'a user has joined the chat');

    //Runs when client disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left the chat');
    });

    //Listen for chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    })
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})