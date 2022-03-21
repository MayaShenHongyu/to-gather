import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser, logOut } = useAuth();
  return (
    <div>
      {currentUser.email}
      <button onClick={() => logOut()}>Sign out</button>
    </div>
  );
}
