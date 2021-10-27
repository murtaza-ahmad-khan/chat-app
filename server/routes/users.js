const express = require("express");
const router = express.Router();

const { search } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.route("/search").get(auth, search);

module.exports = router;
