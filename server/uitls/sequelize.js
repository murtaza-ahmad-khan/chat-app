const { Sequelize } = require("sequelize");
const db = require("../config/db");

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("DB connection failed");
    console.log(err);
  });

module.exports = sequelize;
