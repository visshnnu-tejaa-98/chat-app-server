const users = [];
const addUser = ({ id, name, room }) => {
	// Visshnnu Tejaa ==> visshnnutejaa
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const existingUser = users.find((user) => user.name === name && user.room === room);
	if (existingUser) {
		return { error: 'User name is already taken' };
	}
	const user = { id, name, room };
	users.push(user);
	console.log(users);
	return { user };
};

const removeUser = (id) => {
	const index = users.find((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

console.log(users);
const getUser = (id) => {
	console.log(id);
	console.log(users);
	return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
	users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
