import { Link } from "react-router-dom";
import React from "react";
import "./Landing.css";
import BannerImage from "../assets/friends.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <div className="landing" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1 style={{ fontWeight: "bold", textAlign: 'center', color:'white'}}> To-Gather </h1>
        <p style={{textAlign: 'center', color:'white'}}>Not sure what to do? Perfect.</p>
        <Link to="/menu">
          <div className="button" style={{textAlign: 'center'}}>
            <button> check out nearby events </button>
          </div>
        </Link>
      </div>
      
    </div>
    <Footer />
    </>
  );
}

export default Landing;
