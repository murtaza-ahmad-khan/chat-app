const { DataTypes } = require("sequelize");
const sequelize = require("../uitls/sequelize");

module.exports = sequelize.define("User", {
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
});
