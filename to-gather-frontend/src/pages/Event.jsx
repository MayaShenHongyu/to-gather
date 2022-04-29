import React from "react";
import EventImage from "../assets/boardgame.jpg";
import "./Event.css";
import Navbar from "../components/Navbar";
import headImage from "../assets/xy-head.jpeg";
import MapIcon from '@mui/icons-material/Map';
import TagIcon from '@mui/icons-material/LocalOffer';


function Event() {
    return (
        <>
        <div className="event">
            <div
                className="eventTop"
                style={{ backgroundImage: `url(${EventImage})` }}
            ></div>

        <div className="eventBottom">
             <div className="eventInfo">
                <h2> Game Night</h2>
                <h3> Hosted by Xuanyu Fang</h3>
                <div className = "location">
                    <MapIcon fontSize="small"/>
                    <h4> 1 East Loop Road</h4>
                </div>
                <div className = "tag">
                    <TagIcon fontSize="small"/>
                    <h4>Game, Entertainment</h4>
                </div>
                
                <p>
                Come have fun and enjoy a night with board games!
                </p>
            </div>
            <div className = "eventHost">
                <div className = "eventHostTop">
                    <div className = "eventHostImg">
                        <img src={headImage} />
                    </div>

                    <h3> Xuanyu Fang</h3>
                </div>
                <div className = "eventHostBottom">
                    <p >
                        Hi! I am a student from Cornell Tech.

                    </p>
                </div>
                

            </div>
        </div>
        <div className = "eventSignUp">
            <div className = "eventSignUpDate">
                <h3>Date</h3>
                <p>1 April 2022</p>

            </div>
            <div className = "eventSignUpTime">
                <h3>Time</h3>
                <p>8:00 pm</p>

            </div>
            <div className="button" >
              <button> Join! </button>
            </div>

        </div>
    </div>
        </>
        
      
    );
  }
  
  export default Event;
  