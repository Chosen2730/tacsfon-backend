const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const authorize = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader.starsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorised");
  }
  const token = authHeader.split(" ")[0];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    // req.user = {userID: payload._id}
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authorize;
