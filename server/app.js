const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const app = express();
const cors = require("cors");
const { userJoin, getUser, getUsers } = require("./uitls/users");
const sequelize = require("./uitls/sequelize");

// DB connection
sequelize.sync();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Individual Chatting

// Middleware which checks the username for every request
io.of("/chat").use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.of("/chat").on("connection", (socket) => {
  const auth = socket.handshake.auth;
  socket.join(auth.userId.toString());

  socket.emit("onConnect", socket.id);

  socket.on("message", (message) => {
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

app.get("/", (req, res) => {
  console.log("Welcome to World most beautifull site");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
