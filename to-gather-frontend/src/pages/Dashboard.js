import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/friends.png";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { currentUser } = useAuth();
  return (
    <>
    <Navbar />
    <div
      className="landing"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <div className="headerContainer">
        <h1
          style={{ fontWeight: "bold", textAlign: "center", color: "white" }}
        >
          {" "}
          To-Gather Dashboard{" "}
        </h1>
      </div>
    </div>
    <Footer />
  </>
  );
}
