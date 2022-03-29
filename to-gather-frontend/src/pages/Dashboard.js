import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      {currentUser.email}
    </div>
  );
}
