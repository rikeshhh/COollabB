const express = require('express');
const app = express();
const http = require('http');
const server=http.createServer(app);
const { v4: uuidv4 } = require('uuid');

const {Server}=require("socket.io");
const io =new Server(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});



io.on('connection', (socket) => {
  io.emit('userConnected', 'A new user has connected.');
  socket.on('userTyping', (isTyping) => {
    socket.broadcast.emit('userTyping', isTyping);
  });  
  socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      
    });
    socket.on('disconnect', (msg) => {
      socket.broadcast.emit('userDisconnected',msg);
    });
    
  });

server.listen(3000, () => {
    console.log('listening on port 3000');
});
