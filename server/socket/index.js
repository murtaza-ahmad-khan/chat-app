const { Server } = require("socket.io");

const Message = require("../models").Message;

const users = new Map();

module.exports = function (server) {
  const io = new Server(server, { cors: { origin: "*" } });

  // Middleware
  io.of("/").use((socket, next) => {
    next();
  });

  io.on("connection", (socket) => {
    socket.on("join", (user) => {
      const userWithSocket = { ...user };
      userWithSocket.socketId = socket.id;
      users.set(user.id, userWithSocket);
    });

    socket.on("message", async (message) => {
      const senderSocketId = users.get(message.senderId)?.socketId;
      const receiverSocketId = users.get(message.receiverId)?.socketId;

      const m = {
        message: message.message,
        chatId: message.chatId,
        senderId: message.senderId,
        receiverId: message.receiverId,
      };
      // Save message in database
      const savedMessage = await Message.create(m);

      io.to([senderSocketId, receiverSocketId]).emit("message", {
        ...message,
        id: savedMessage.id,
      });
    });

    socket.on("leave", (user) => {
      users.delete(user.id);
    });
  });

  /*
  io.of("/chat").on("connection", (socket) => {
    const auth = socket.handshake.auth;
    socket.join(auth.userId.toString());

    socket.emit("onConnect", socket.id);

    socket.on("message", (message) => {
      console.log(socket);
      console.log(message);
      socket.to(message.to).emit("message", message);
    });
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, roomName }) => {
      // when a user join, store the user in array
      const user = userJoin({ username, roomName, id: socket.id });

      socket.join(user.roomName);

      socket.emit("message", { text: "Welcome to Chat" });

      socket.broadcast
        .to(user.roomName)
        .emit("message", { text: `${user.username} has joined the chat` });

      // Send users
      io.to(user.roomName).emit("users", getUsers(user.roomName));
    });

    socket.on("userMessage", (message) => {
      const user = getUser(socket.id);

      io.to(user.roomName).emit("message", {
        username: user.username,
        text: message,
      });
    });

    socket.on("disconnect", () => {
      const user = getUser(socket.id);
      if (user) {
        io.to(user.roomName).emit("message", {
          text: `${user.username} has left the chat`,
        });
      }
    });
  });

  */
};
