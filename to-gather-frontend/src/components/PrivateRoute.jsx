import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div />;
  }

  return currentUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
