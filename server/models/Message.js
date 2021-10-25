const { DataTypes } = require("sequelize");

const sequelize = require("../uitls/sequelize");

const Message = sequelize.define("Message", {
  chatId: {
    type: DataTypes.INTEGER,
  },
  senderId: {
    type: DataTypes.INTEGER,
  },
  message: {
    type: DataTypes.TEXT,
  },
  file: {
    type: DataTypes.STRING,
  },
});

Message.associations = (models) => {
  Message.belongsTo(models.Chat, { foreignKey: "chatId" });
  Message.belongsTo(models.User, { foreignKey: "senderId" });
};

module.exports = Message;
