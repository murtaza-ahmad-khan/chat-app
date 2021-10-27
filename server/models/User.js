"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Message, { foreignKey: "senderId", as: "sender" });
      this.hasMany(models.Message, {
        foreignKey: "receiverId",
        as: "receiver",
      });
      this.hasMany(models.Chat, { foreignKey: "userId", as: "user" });
      this.hasMany(models.Chat, { foreignKey: "partnerId", as: "partner" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );
  return User;
};

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  return user;
};
