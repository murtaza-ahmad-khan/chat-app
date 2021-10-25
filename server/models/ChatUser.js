const { DataTypes } = require("sequelize");

const sequelize = require("../uitls/sequelize");

const ChatUser = sequelize.define("ChatUser", {
  userId: {
    type: DataTypes.INTEGER,
  },
  chatId: {
    type: DataTypes.INTEGER,
  },
});

ChatUser.associations = (models) => {
  ChatUser.belongsTo(models.User, { foreignKey: "userId" });
  ChatUser.belongsTo(models.Chat, { foreignKey: "chatId" });
};

module.exports = ChatUser;
