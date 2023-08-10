const express = require("express");
const router = express.Router();
const todosController = require("../controller/todo.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

//It uses authentication middleware to ensure only authenticated users can access it.
router.get(
  "/",
  authenticationMiddleware.authenticate,
  todosController.getAllTodos
);

router.post(
  "/",
  authenticationMiddleware.authenticate,
  validationMiddleware.jsonContentType,
  validationMiddleware.maxTaskLength,
  todosController.createTodo
);

router.put(
  "/:id",
  authenticationMiddleware.authenticate,
  validationMiddleware.jsonContentType,
  validationMiddleware.maxTaskLength,
  todosController.updateTodo
);

router.delete(
  "/:id",
  authenticationMiddleware.authenticate,
  todosController.deleteTodoById
);

module.exports = router;
