const { Op } = require("sequelize");
const User = require("../models").User;

// exports.getUsers = async (req, res) => {
//   const users = await User.findAll();
//   res.send(users);
// };

exports.search = async (req, res) => {
  const { username } = req.query;

  let user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user || user?.id === req.user.id) {
    return res.json(null);
  }

  user = user.get({ raw: true });

  delete user.password;

  res.json(user);
};
