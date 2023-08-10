const config = require("../config/config.json");
const jwt = require("jsonwebtoken");

// Exports an authentication middleware to validate a JWT token included in the request headers.
exports.authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = req.headers.authorization.replace(/bearer /i, "");

  try {
    const decoded = jwt.verify(token, process.env.SECRET || config.secret);
    req.user = decoded; // Assuming the decoded token contains user information
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
