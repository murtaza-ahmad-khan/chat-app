const { DataTypes } = require("sequelize");

const sequelize = require("../uitls/sequelize");

const Chat = sequelize.define("Chat", {});

Chat.associations = (models) => {
  Chat.belongsToMany(models.User, {
    through: "ChatUser",
    foreignKey: "chatId",
  });
  Chat.hasMany(models.ChatUser, { foreignKey: "chatId" });
  Chat.hasMany(models.Message, { foreignKey: "chatId" });
};

module.exports = Chat;
