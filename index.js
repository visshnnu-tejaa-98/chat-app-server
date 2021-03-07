const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 8000;

// initialized express server
const app = express();
// created server using http
const server = http.createServer(app);
// creating the instance of io
const io = socketio(server);

// server listining
server.listen(PORT, () => console.log(`server started on port : ${PORT}`));
