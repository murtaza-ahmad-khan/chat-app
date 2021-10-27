const jwt = require("jsonwebtoken");

const { jwt_secret } = require("../config/app");

exports.auth = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json("Not authorize to access this route");
  }

  try {
    // verify token
    const decodeUser = jwt.verify(token, jwt_secret);
    req.user = decodeUser;

    next();
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
};
