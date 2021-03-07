const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// locol imports
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 8000;

// initialized express server
const app = express();
// created server using http
const server = http.createServer(app);
// creating the instance of io
const io = socketio(server);

// io functions
io.on('connection', (socket) => {
	console.log('user connected');
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		if (error) {
			return callback(error);
		}
		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, welcome to the room ${user.room}`,
		});

		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'admin', text: `${user.name} has joined ` });
		socket.join(user.room);
		io.to(user.room).emit('roomData', { room: user.room }, { users: getUsersInRoom(user.room) });
		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit('message', { user: user.name, text: message });
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		callback();
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
		}
		console.log('user disconnected!!!');
	});
});

// middle wares
app.use(router);

// server listining
server.listen(PORT, () => console.log(`server started on port : ${PORT}`));
