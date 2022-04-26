import React from "react";
import EventImage from "../assets/friends.png";
import "./Event.css";
import Navbar from "../components/Navbar";

function Event() {
    return (
        <>
        <Navbar />
        <div className="event">
            <div
                className="eventTop"
                style={{ backgroundImage: `url(${EventImage})` }}
            ></div>

        <div className="eventBottom">
             <div className="eventInfo">
                <h2> Event Name</h2>
                <h3> Hosted by Xuanyu Fang</h3>
                <p>
                Event description
                </p>
            </div>
            <div className = "eventHost">
                <h3> Xuanyu Fang</h3>

            </div>
        
            
            
            
        </div>
    </div>
        </>
        
      
    );
  }
  
  export default Event;
  