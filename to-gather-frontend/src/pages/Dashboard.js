import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/friends.png";
import Footer from "../components/Footer";
import { createEvent } from "../backend";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const newEvent = () =>
    createEvent(currentUser.uid, { name: "event name", time: Date.now() });
  return (
    <>
      <Navbar />
      <div
        className="landing"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <div className="headerContainer">
          <button onClick={newEvent}>New event</button>
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
