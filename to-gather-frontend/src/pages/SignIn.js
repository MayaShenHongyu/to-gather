import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const { logIn, register, currentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState();
  const location = useLocation();

  const handleLogIn = (email, password) => {
    logIn(email, password);
  };

  const handleRegister = (email, password) => {
    register(email, password).catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(
          "Email already in use. Please log in or use a new email."
        );
      }
    });
  };

  if (currentUser) {
    return <Navigate to={location.state?.from?.pathname || "/dashboard"} />;
  }

  return (
    <div>
      <button
        onClick={() =>
          handleRegister("aelitashy@gmail.com", "password", setErrorMessage)
        }
      >
        Register
      </button>
      <button onClick={() => handleLogIn("aelitashy@gmail.com", "password")}>
        Sign in
      </button>
      <p>{currentUser?.email}</p>
      <p>{errorMessage}</p>
    </div>
  );
}
