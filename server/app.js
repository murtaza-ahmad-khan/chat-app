const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./uitls/sequelize");

// DB connection
sequelize.sync();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  console.log("Welcome");
});

const server = http.createServer(app);

// Socket
require("./socket")(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
