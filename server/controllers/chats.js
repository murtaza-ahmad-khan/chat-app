const { Op } = require("sequelize");
const Chat = require("../models").Chat;
const User = require("../models").User;
const Message = require("../models").Message;

exports.createChat = async (req, res) => {
  const { partnerId } = req.body;
  const userId = req.user.id;

  // Check if chat is already created
  let chat = await Chat.findOne({
    where: {
      userId: {
        [Op.in]: [userId, partnerId],
      },
      partnerId: {
        [Op.in]: [userId, partnerId],
      },
    },
  });

  if (chat) return res.status(400).json("Chat already exists");

  // Create Chat
  chat = await Chat.create(
    { userId, partnerId },
    {
      include: [
        { model: User, as: "user" },
        { model: User, as: "partner" },
      ],
    }
  );

  chat = await Chat.findOne({
    where: {
      id: chat.id,
    },
    include: [
      { model: User, as: "user" },
      { model: User, as: "partner" },
    ],
  });

  res.json(chat);
};

exports.getChats = async (req, res) => {
  const userId = req.user.id;

  const chats = await Chat.findAll({
    where: {
      [Op.or]: [
        { userId: { [Op.eq]: userId } },
        { partnerId: { [Op.eq]: userId } },
      ],
    },
    include: [
      { model: User, as: "user" },
      { model: User, as: "partner" },
    ],
  });

  res.json(chats);
};

exports.getChatMessages = async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.user.id;

  // await Message.create({
  //   chatId: 2,
  //   senderId: userId,
  //   receiverId: 1,
  //   message: `Hello from user${userId}`,
  // });

  // await Message.create({
  //   chatId: 2,
  //   senderId: 1,
  //   receiverId: 2,
  //   message: `Hello from user${1}`,
  // });

  const messages = await Message.findAll({
    where: {
      chatId,
      [Op.or]: [
        { senderId: { [Op.eq]: userId } },
        { receiverId: { [Op.eq]: userId } },
      ],
    },
    include: [
      { model: User, as: "sender" },
      { model: User, as: "receiver" },
    ],
  });

  res.json(messages);
};
