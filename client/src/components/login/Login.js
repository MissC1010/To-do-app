import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowSignup = () => {
    setShowLogin(false);
  };

  return (
    <Container className="d-flex justify-content-center">
      <div className="w-50">
        {showLogin ? (
          <LoginForm handleShowSignup={handleShowSignup} />
        ) : (
          <SignupForm handleShowLogin={handleShowLogin} />
        )}
      </div>
    </Container>
  );
};

export default Login;
