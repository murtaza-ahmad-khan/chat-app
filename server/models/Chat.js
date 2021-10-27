"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Message, { foreignKey: "chatId" });
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.belongsTo(models.User, {
        foreignKey: "partnerId",
        as: "partner",
      });
    }
  }
  Chat.init(
    {
      userId: DataTypes.INTEGER,
      partnerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
