const { Op } = require("sequelize");
const Contact = require("../models/Contact");
const User = require("../models/User");

exports.createContact = async (req, res) => {
  // first find user by username
  const user = await User.findOne({
    where: { username: req.body.username },
  });
  if (!user) return res.status(404).send("User not found");

  const contact = await Contact.create({
    user: req.body.user.id,
    contact: user.id,
  });
  res.status(201).send(contact);
};

exports.getContacts = async (req, res) => {
  const contactsTable = await Contact.findAll({
    where: { user: req.query.userId },
  });

  let contactsId = contactsTable.map((c) => c.contact);

  const contactList = await User.findAll({
    where: {
      id: {
        [Op.in]: contactsId,
      },
    },
  });

  res.send(contactList);
};
