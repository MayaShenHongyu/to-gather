import React, { useState } from "react";
import Logo from "../assets/togather-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
//import ReorderIcon from "@material-ui/icons/Reorder";
import "./Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { currentUser, logOut } = useAuth();

  const CheckSignedIn = ({ input }) => {
    if (!input) {
      return (
        <Link to="/Login">
          <button> Sign In </button>
        </Link>
      );
    } else {
      return (
        <Link to="/">
          <button onClick={() => logOut()}>Sign Out</button>
        </Link>
      );
    }
  };

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <h3 style={{ color: "white" }}>ToGather</h3>
        {/* <div className="hiddenLinks">
          <Link to="/Login"> Sign-in / Sign-up </Link>
        </div> */}
      </div>
      {/* <Link to="/Login">
        <button> Sign-in / Sign-up </button>
      </Link> */}
      <CheckSignedIn input={currentUser} />
    </div>
  );
}

export default Navbar;
