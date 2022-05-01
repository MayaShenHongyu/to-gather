import React, { useState } from "react";
import Logo from "../assets/togather-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@mui/material";
import "./Navbar.css";

function Navbar({ showCreateEventButton = false, toggleCreateEvent }) {
  const [openLinks, setOpenLinks] = useState(false);
  const { currentUser, logOut } = useAuth();

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
        <div className="rightSide">
          {showCreateEventButton && (
            <Button
              id="create-event-btn"
              variant="contained"
              onClick={toggleCreateEvent}
            >
              Create event
            </Button>
          )}
          <Button id="profile-btn" href="/profile">
            Profile
          </Button>
          <Button id="logout-btn" onClick={logOut}>
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
