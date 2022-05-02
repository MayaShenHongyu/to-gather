import React, { useEffect, useState } from "react";
import { Divider, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Banner from "../assets/background.jpg";
import EventCard from "../components/EventCard";
import { getUser } from "../backend";
import "./Profile.css";

export default function Profile({ uid, goBack, onClickEvent }) {
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUser(uid, setUser, setEvents).catch((_error) => {
      console.log(_error);
      // navigate(-1);
    });
  }, []);

  if (!user) {
    return <div />;
  }

  return (
    <div className="layout" style={{ height: "100%" }}>
      <IconButton id="back-btn" color="primary" onClick={goBack}>
        <ArrowBack />
      </IconButton>

      <div className="banner">
        <img src={Banner} />
      </div>

      <div className="profile">
        <div className="profile-picture">
          {user.profilePic ? <img src={user.profilePic} /> : undefined}
        </div>
        <div className="name">{`${user.firstName} ${user.lastName}`}</div>
        <div className="description">{user.bio}</div>
        <div className="figures">
          <div className="figure">
            <div className="number">{user.hosting.length}</div>
            <div className="label">Hosted</div>
          </div>
          <Divider
            sx={{ borderWidth: 1, borderColor: "var(--gray)" }}
            orientation="vertical"
            flexItem
          />
          <div className="figure">
            <div className="number">{user.participating.length}</div>
            <div className="label">Participated</div>
          </div>
        </div>

        <div className="events">
          <div className="events-title">Hostings</div>
          <div className="events-container">
            {events.map((e, idx) => (
              <EventCard
                key={idx}
                title={e.name}
                date={e.time}
                imgSrc={e.thumbnail}
                description={e.description}
                onClick={() => onClickEvent(e.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
