const { DataTypes } = require("sequelize");
const sequelize = require("../uitls/sequelize");

module.exports = sequelize.define("Contact", {
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  contact: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
});
