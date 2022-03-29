import { Link } from "react-router-dom";
import React from "react";
import "./Landing.css";
import BannerImage from "../assets/friends.png";
import Landing1 from "../assets/landing1.jpg";
import Landing2 from "../assets/landing2.jpg";
import Landing3 from "../assets/landing3.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <div
        className="landing"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <div className="headerContainer">
          <h1 style={{ textAlign: "center", color: "white" }}>
            {" "}
            Get To-Gather, Get Together.{" "}
          </h1>
          <p style={{ textAlign: "center", color: "white" }}>
            Not sure what to do? Perfect.
          </p>
          <Link to="/dashboard">
            <div className="button" style={{ textAlign: "center" }}>
              <button> check out nearby events </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="midBanner">
        <h2>ToGather is a place where you can...</h2>
      </div>
      <div className="imageWrapper">
        <div className="image">
          <img src={Landing1} />
          <div>
            <h3>Find friends</h3>
          </div>
        </div>
        <div className="image">
          <img src={Landing2} />
          <div>
            <h3>Explore cities</h3>
          </div>
        </div>
        <div className="image">
          <img src={Landing3} />
          <div>
            <h3>Go on adventures</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing;
