import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Profile from "./Profile";
import headImage from "../assets/xy-head.jpeg";
import MapIcon from "@mui/icons-material/Map";
import TagIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import { getUser, getEvent, joinEvent, withdrawFromEvent } from "../backend";
import "./Event.css";

function Event({ id, profileOnClickEvent }) {
  const { currentUser } = useAuth();
  const [isViewingHost, setIsViewingHost] = useState(false);
  const [host, setHost] = useState();
  const [eventData, setEventData] = useState();
  const [isParticipating, setIsParticipating] = useState(false);

  const isCurrentUserHost = host?.uid == currentUser?.uid;

  useEffect(() => {
    getEvent(id, setEventData);
  }, []);

  useEffect(() => {
    if (eventData) {
      getUser(eventData.hostID, setHost).catch((_error) => {
        console.log(_error);
      });
      getUser(currentUser.uid, (user) =>
        setIsParticipating(user.participating.includes(eventData.id))
      );
    }
  }, [eventData]);

  if (!host || !eventData) {
    return <div />;
  }

  if (isViewingHost) {
    return (
      <Profile
        uid={eventData.hostID}
        goBack={() => setIsViewingHost(false)}
        onClickEvent={(id) => {
          setIsViewingHost(false);
          profileOnClickEvent(id);
        }}
      />
    );
  }

  const buttonTitle =
    host.uid == currentUser.uid
      ? "Edit Event"
      : isParticipating
      ? "Unjoin"
      : "Join";
  const buttonAction =
    host.uid == currentUser.uid
      ? undefined
      : isParticipating
      ? withdrawFromEvent
      : joinEvent;
  const withForceUpdate = (action) => {
    if (action) {
      action(currentUser.uid, eventData.id);
      setIsParticipating(!isParticipating);
    }
  };

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
            <h3>{`Hosted by ${host.firstName} ${host.lastName}`}</h3>
            <div className="location">
              <MapIcon fontSize="small" />
              <h4> 1 East Loop Road</h4>
            </div>
            <div className="tag">
              <TagIcon fontSize="small" />
              <h4>Game, Entertainment</h4>
            </div>
            <div className="groupSize">
              <PeopleIcon fontSize="small" />
              <h4>10 People</h4>
            </div>


            <p>{eventData.description}</p>
          </div>
          {!isCurrentUserHost && (
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
          )}
        </div>
        <div className="eventSignUp">
          <div className="eventSignUpDate">
            <h3>Date</h3>
            <p>{`${eventData.time.toString().split(' ').slice(0,4).join(' ')}`}</p>
          </div>
          <div className="eventSignUpTime">
            <h3>Time</h3>
            <p>{`${eventData.time.toString().split(' ').slice(4,5).join(' ')}`}</p>
          </div>
          <div className="button">
            <button onClick={() => withForceUpdate(buttonAction)}>
              {buttonTitle}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
