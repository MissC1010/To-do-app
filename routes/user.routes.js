const express = require("express");
const router = express.Router();
const usersController = require("../controller/user.controller");
const middleWareAuth = require("../middleware/authentication.middleware");
const middleWareValidation = require("../middleware/validation.middleware");

//Main Route for GET AND POST using authentication and validation before sending response
router.post(
  "/register",
  middleWareValidation.invalidUsername,
  usersController.register
);
router.post("/login", usersController.login);
router.get("/auth", middleWareAuth.authenticate, usersController.auth);

module.exports = router;
