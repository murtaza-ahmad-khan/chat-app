const express = require("express");
const { getUsers, createUser } = require("../controllers/users");
const router = express.Router();

router.route("/").get(getUsers);

module.exports = router;
