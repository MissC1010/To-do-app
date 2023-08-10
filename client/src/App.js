import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import TodoList from "./components/todo/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

//App checks if the user has a valid JWT token, if so the todo view will render, else the login/register screen will render
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return <div className="App">{loggedIn ? <TodoList /> : <Login />}</div>;
}

export default App;
