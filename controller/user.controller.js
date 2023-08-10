const config = require("../config/config.json");
const db = require("../db");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Registers a new user
exports.register = async (req, res) => {
  const user = req.body;
  const username = user.username;
  const password = user.password;

  //Validate username and password
  if (!username || !password) {
    return res.status(400).send({ err: "Username and password is required" });
  }
  const users = await db.getAllUsers_async();
  const existingUser = users.find((x) => x.username === username);
  if (existingUser) {
    return res.status(400).send({ err: "Username already exists" });
  }

  //Create User
  try {
    db.createUser_async(user);
  } catch (err) {
    console.log(err);
    return;
  }

  //Generate and sign token
  const token = jwt.sign(
    { username: user.username, userId: user._id },
    process.env.SECRET || config.secret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
  return res.send({ token: token });
};

// Login functionality for existing users
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Validate username and password
  if (!username || !password) {
    return res.status(400).send({ err: "Username and password is required" });
  }
  const users = await db.getAllUsers_async();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).send({ err: "Username or password not valid" });
  }

  //Generate and sign token
  const token = jwt.sign(
    { username: user.username, userId: user._id },
    process.env.SECRET || config.secret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
  return res.send({ token: token });
};

exports.auth = async (req, res) => {
  return res.send();
};
