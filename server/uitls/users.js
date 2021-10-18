let users = [];

function userJoin(user) {
  users.push(user);
  return user;
}

function getUser(id) {
  return users.find((u) => u.id === id);
}

function getUsers(roomName) {
  return users.filter((u) => u.roomName === roomName);
}

module.exports = {
  userJoin,
  getUser,
  getUsers,
};
