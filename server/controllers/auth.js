const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(404).send("User not found");

  // Checking password with encrypted passwod
  if (!bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "Incorrect password!" });

  sendUserWithToken(user.get({ raw: true }), res);
};

exports.signup = async (req, res) => {
  let user = await User.findOne({ where: { username: req.body.username } });

  if (user) return res.status(400).send("Username already exists");

  user = await User.create(req.body);

  sendUserWithToken(user.get({ raw: true }), res);
};

function sendUserWithToken(user, res) {
  delete user.password;

  const token = jwt.sign({ username: user.username }, "secret");
  res.json({ user, token });
}
