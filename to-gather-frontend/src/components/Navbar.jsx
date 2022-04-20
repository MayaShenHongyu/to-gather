import React, { useState } from "react";
import Logo from "../assets/togather-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { currentUser, logOut } = useAuth();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/dashboard">
          <img src={Logo} />
        </Link>
        <Link to="/dashboard">
          <h3 style={{ color: "white" }}>ToGather</h3>
        </Link>
      </div>
      {currentUser && (
        <Link className="btn" to="/">
          <button onClick={() => logOut()}>Sign Out</button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
