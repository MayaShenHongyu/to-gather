import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Divider, IconButton, Button } from "@mui/material";
import { ArrowBack, Edit } from "@mui/icons-material";
// import Banner from "../assets/landing1.jpg";
import Banner from "../assets/background.jpg";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { getUser } from "../backend";
import "./Profile.css";

export default function Profile({ uid, goBack, isOwnProfilePage = false }) {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // const uid = id == "own" ? currentUser.uid : id;
    // const uid = currentUser.uid;
    const userID = isOwnProfilePage ? currentUser.uid : uid;
    getUser(userID, setUser, setEvents).catch((_error) => {
      console.log(_error);
      // navigate(-1);
    });
  }, []);

  if (!user) {
    return <div />;
  }

  return (
    <div
      className="layout"
      style={{ height: isOwnProfilePage ? "100vh" : "100%" }}
    >
      {isOwnProfilePage && <Navbar />}
      {goBack && (
        <IconButton id="back-btn" color="primary" onClick={goBack}>
          <ArrowBack />
        </IconButton>
      )}

      <div className="banner">
        <img src={Banner} />
      </div>

      <div className="profile">
        {isOwnProfilePage && (
          <Button id="edit-btn" startIcon={<Edit />}>
            Edit profile
          </Button>
        )}
        <div className="profile-picture"></div>
        <div className="name">{`${user.firstName} ${user.lastName}`}</div>
        <div className="description">
          I’m web designer, I work in programs like figma, adobe photoshop,
          adobe illustrator
        </div>
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
          <div className="events-title">Hostings</div>
          {events.map((event, idx) => (
            <div key={idx} className="events-event">
              <div>{event.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
