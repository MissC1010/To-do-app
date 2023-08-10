const db = require("../db");

// Retrieves all the todos from the database and sends them as a response.
exports.getAllTodos = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todos = await db.getAllTodosByUserId_async(userId);

    if (!todos || todos.length <= 0) {
      return res.status(204).send();
    }

    return res.send(todos);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all todos" });
  }
};

//Creates a new todo in the database and returns the id of the created todo.
exports.createTodo = async (req, res) => {
  try {
    var todo = { ...req.body, userId: req.user.userId };
    var id = await db.createTodo_async(todo);
    return res.send(id);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to create todo" });
  }
};

// Update a todo by its ID
exports.updateTodo = async (req, res) => {
  try {
    var todo = await db.updateTodo_async(req.params.id, req.body);
    return res.send(todo.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to update todo by id: [${req.params.id}]` });
  }
};

//Delete a todo with the specified id from the database
exports.deleteTodoById = async (req, res) => {
  try {
    await db.deleteTodoById_async(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ err: `Failed to delete todo by id: [${req.params.id}]` });
  }
};
