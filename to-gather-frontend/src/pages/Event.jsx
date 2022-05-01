import React, { useState, useEffect } from "react";
import EventImage from "../assets/boardgame.jpg";
import Profile from "./Profile";
import headImage from "../assets/xy-head.jpeg";
import MapIcon from "@mui/icons-material/Map";
import TagIcon from "@mui/icons-material/LocalOffer";
import { getUser } from "../backend";
import "./Event.css";

function Event({ eventData }) {
  const [isViewingHost, setIsViewingHost] = useState(false);
  const [host, setHost] = useState();

  useEffect(() => {
    getUser(eventData.hostID, setHost).catch((_error) => {
      console.log(_error);
    });
  }, []);

  if (!host) {
    return <div />;
  }

  if (isViewingHost) {
    return (
      <Profile uid={eventData.hostID} goBack={() => setIsViewingHost(false)} />
    );
  }

  return (
    <>
      <div className="event">
        <div
          className="eventTop"
          style={{ backgroundImage: `url(${eventData.thumbnail})` }}
        ></div>

        <div className="eventBottom">
          <div className="eventInfo">
            <h2>{eventData.name}</h2>
            <h3>{`Hosted by${host.firstName}${host.lastName}`}</h3>
            <div className="location">
              <MapIcon fontSize="small" />
              <h4> 1 East Loop Road</h4>
            </div>
            <div className="tag">
              <TagIcon fontSize="small" />
              <h4>Game, Entertainment</h4>
            </div>

            <p>{eventData.description}</p>
          </div>
          <div className="eventHost" onClick={() => setIsViewingHost(true)}>
            <div className="eventHostTop">
              <div className="eventHostImg">
                <img src={headImage} />
              </div>

              <h3>{`${host.firstName} ${host.lastName}`}</h3>
            </div>
            <div className="eventHostBottom">
              <p>{host.bio}</p>
            </div>
          </div>
        </div>
        <div className="eventSignUp">
          <div className="eventSignUpDate">
            <h3>Date</h3>
            <p>{`${eventData.time.toString()}`}</p>
          </div>
          <div className="eventSignUpTime">
            <h3>Time</h3>
            <p>8:00 pm</p>
          </div>
          <div className="button">
            <button> Join! </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
