import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const TodoItem = ({ id, title, color, onDelete, onUpdate }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  // The handleDelete function is an asynchronous function that is called when the user clicks the "Delete" button for a Todo item.
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
      //If the DELETE request is successful, it calls the onDelete callback function to remove the Todo item from the UI.
      onDelete(id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // This function handles updating the title of a todo item.
  const handleUpdate = () => {
    onUpdate(id, editTitle);
    setIsEditing(false);
    window.location.reload();
  };

  //The component is enclosed in a Card component with the background color set to the color prop.
  return (
    <Card style={{ backgroundColor: color }}>
      <Card.Body>
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleUpdate();
              }
            }}
            autoFocus
          />
        ) : (
          // If the isEditing state is false, the Card.Title element is rendered with an onClick handler that sets the isEditing state to true.
          <Card.Title onClick={() => setIsEditing(true)}>{title}</Card.Title>
        )}
        {/* The Edit button has an onClick handler that toggles the isEditing state. */}
        <Button
          variant="secondary"
          onClick={() => setIsEditing((prevState) => !prevState)}>
          Edit
        </Button>{" "}
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
