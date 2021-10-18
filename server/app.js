const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const app = express();
const cors = require("cors");
const { userJoin, getUser, getUsers } = require("./uitls/users");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

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

app.get("/", (req, res) => {
  console.log("Welcome to World most beautifull site");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
