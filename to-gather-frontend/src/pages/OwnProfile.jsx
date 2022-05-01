import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Modal, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
// import Banner from "../assets/landing1.jpg";
import Banner from "../assets/background.jpg";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Event from "./Event";
import { useAuth } from "../contexts/AuthContext";
import { getUser } from "../backend";
import "./Profile.css";

export default function OwnProfile() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [hosting, setHosting] = useState([]);
  const [participating, setParticipating] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState();

  useEffect(() => {
    getUser(currentUser.uid, setUser, setHosting).catch((_error) => {
      console.log(_error);
    });
  }, []);

  if (!user) {
    return <div />;
  }

  return (
    <div className="layout" style={{ height: "100vh" }}>
      <Navbar />

      <div className="banner">
        <img src={Banner} />
      </div>

      <div className="profile">
        <Button id="edit-btn" startIcon={<Edit />}>
          Edit profile
        </Button>
        <div className="profile-picture"></div>
        <div className="name">{`${user.firstName} ${user.lastName}`}</div>
        <div className="description">{user.bio}</div>
        <div className="figures">
          <div className="figure">
            <div className="number">20</div>
            <div className="label">Hosted</div>
          </div>
          <Divider
            sx={{ borderWidth: 1, borderColor: "var(--gray)" }}
            orientation="vertical"
            flexItem
          />
          <div className="figure">
            <div className="number">129</div>
            <div className="label">Participated</div>
          </div>
        </div>

        <div className="events">
          <div className="events-title">Hosting</div>
          <div className="events-container">
            {hosting.map((e, idx) => (
              <EventCard
                key={idx}
                title={e.name}
                date={e.time}
                imgSrc={e.thumbnail}
                description={e.description}
                onClick={() => setSelectedEventID(e.id)}
              />
            ))}
          </div>
        </div>

        {participating.length != 0 && (
          <div className="events">
            <div className="events-title">Participating</div>
            <div className="events-container">
              {participating.map((e, idx) => (
                <EventCard
                  key={idx}
                  title={e.name}
                  date={e.time}
                  imgSrc={e.thumbnail}
                  description={e.description}
                  onClick={() => setSelectedEventID(e.id)}
                />
              ))}
            </div>
          </div>
        )}

        <Modal
          open={selectedEventID != undefined}
          onClose={() => setSelectedEventID(undefined)}
        >
          <div className="event-modal">
            <Event id={selectedEventID} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
