const express = require("express");
const router = express.Router();

const {
  createChat,
  getChats,
  getChatMessages,
} = require("../controllers/chats");
const { auth } = require("../middlewares/auth");

router.route("/").get(auth, getChats).post(auth, createChat);
router.route("/:chatId").get(auth, getChatMessages);

module.exports = router;
