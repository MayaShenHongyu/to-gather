import React, { useState } from "react";
import Logo from "../assets/togather-logo.png";
import { Link } from "react-router-dom";
//import ReorderIcon from "@material-ui/icons/Reorder";
import "./Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <h3 style={{color:'white'}}>ToGather</h3>
        <div className="hiddenLinks">
          <Link to="/Login"> Sign-in / Sign-up </Link>
        </div>
      </div>
      <Link to="/Login">
            <button> Sign-in / Sign-up </button>

        </Link>
      
    </div>
  );
}

export default Navbar;
