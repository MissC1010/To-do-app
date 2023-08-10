const Todo = require("./models/todo.model");
const User = require("./models/user.model");

//User CRUD
//Returns all the users present in the database
exports.getAllUsers_async = async () => {
  return await User.find();
};

//Creates a new user in the database and returns its id
exports.createUser_async = async (user) => {
  return await new User(user).save();
};

//Updates an existing user in the database with the provided id and returns the updated user
exports.updateUser_async = async (id, user) => {
  return await User.findByIdAndUpdate(id, user);
};

//Deletes a user from the database with the provided id
exports.deleteUserById_async = async (id) => {
  await User.findByIdAndDelete(id);
};

//Todo CRUD
//Returns all the todos present in the database
exports.getAllTodos_async = async () => {
  return await Todo.find();
};

// Returns all the todos for the specified user ID from the database
exports.getAllTodosByUserId_async = async (userId) => {
  return await Todo.find({ userId: userId });
};

//Creates a new todo in the database and returns its id
exports.createTodo_async = async (todo) => {
  return await new Todo(todo).save();
};

//Updates an existing todo in the database with the provided id and returns the updated todo
exports.updateTodo_async = async (id, todo) => {
  return await Todo.findByIdAndUpdate(id, todo);
};

//Deletes a todo from the database with the provided id
exports.deleteTodoById_async = async (id) => {
  return await Todo.findByIdAndDelete(id);
};
