// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import TodoItem from "./TodoItem";

// Main ToDoList component
const TodoList = () => {
  // Initialize states for todos list, error message, and modals
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editModalShow, setEditModalShow] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("#FFFFFF");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  // UseEffect hook to fetch todos from server and update state
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Obtain authorization token from cookies
        const token = sessionStorage.getItem("token");
        // Request todos data from server
        const res = await fetch("http://localhost:5000/api/todo", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!res.ok) {
          setErrorMessage((await res.json()).err);
          return;
        }

        const data = await res.json();
        setTodos(data);
        setErrorMessage("");
        // Log error and set error message state
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, []);

  // Function to handle when create button is clicked
  const handleCreateClick = () => {
    setShowModal(true);
  };

  // Function to handle when modal is closed and reset state values
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTaskTitle("");
    setNewTaskColor("#FFFFFF");
    setNewTaskDate(new Date());
  };

  // Function to handle changes in the new task title input field
  const handleNewTaskTitleChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  // Function to handle changes in the new task color input field
  const handleNewTaskColorChange = (event) => {
    setNewTaskColor(event.target.value);
  };

  const handleCreateTask = async () => {
    try {
      // Obtain authorization token from cookies
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          task: newTaskTitle,
          color: newTaskColor,
          finishDate: newTaskDate,
        }),
      });
      // If there was an error, log it to the console and return
      if (!res.ok) {
        console.log("There was an error");
        return;
      }

      const data = await res.json();
      setTodos([...todos, data]);
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

  // This function is responsible for deleting a task
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!res.ok) {
        console.log(await res.json());
        return;
      }
      onDelete(id);
      // Reload the page to update the UI
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // This function handles editing and saving a todo item
  const handleEditSave = async (id, updatedTitle) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          task: updatedTitle,
        }),
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
      const updatedTodo = await res.json();
      setTodos(
        todos.map((todo) =>
          todo._id === updatedTodo._id
            ? { ...todo, task: updatedTodo.task }
            : todo
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {/* errorMessage is rendered to display an error message if there is any. */}
      {errorMessage}
      <h1>Todo List</h1>
      {/* A "Create" button is rendered with an "onClick" event listener to trigger the "handleCreateClick" function when clicked. */}
      <Button className="mt-10" variant="primary" onClick={handleCreateClick}>
        Create
      </Button>
      <div>
        {/* A list of TodoItem components is rendered, mapped from an array of
        "todos". */}
        {todos.map((todo) => (
          // Each TodoItem component takes in the necessary props such as id, title, color, finishDate, onDelete, and onUpdate.
          <TodoItem
            key={todo._id}
            id={todo._id}
            title={todo.task}
            color={todo.color}
            finishDate={todo.finishDate}
            onDelete={handleDelete}
            onUpdate={handleEditSave}
          />
        ))}
      </div>
      {/* The Modal component is used for creating a Todo item. It consists of
      a Form with two form controls: one for the title and the other for the
      color. */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={handleNewTaskTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                as="select"
                value={newTaskColor}
                onChange={handleNewTaskColorChange}
                // Users can decided what color the background of the todo should be
              >
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Red">Red</option>
                <option value="Green">Green</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Button to save the modal */}
          <Button variant="primary" onClick={handleCreateTask}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TodoList;
