const User = require("../models/User");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).send(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
};
