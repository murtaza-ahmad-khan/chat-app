const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../uitls/sequelize");

module.exports = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  }
);

// Hash password before saving in database
async function hashPassword(user) {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
}
