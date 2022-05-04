import React, { useEffect, useState } from "react";
import Background from "../assets/background.jpg";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import MultiSelect from "../components/MultiSelect";
import EventCard from "../components/EventCard";
import Event from "./Event";
import PostEvent from "../components/PostEvent";
// import Footer from "../components/Footer";
import { getFilteredEvents } from "../backend";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Modal,
} from "@mui/material";

import "./Dashboard.css";

const categories = ["Sports", "Kids", "Music", "Board Games"];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState("anytime");
  const [events, setEvents] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState();
  const [isPostEventModalOpen, setIsPostEventModalOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const beforeTime =
      dateFilter === "anytime"
        ? undefined
        : dateFilter === "today"
        ? new Date(year, month, date + 1)
        : dateFilter === "in three days"
        ? new Date(year, month, date + 3)
        : new Date(year, month, date + 8);
    getFilteredEvents(categoryFilter, beforeTime).then((events) =>
      setEvents(events)
    );
  }, [dateFilter, categoryFilter]);

  const dateFilterSelector = (
    <FormControl size="small" sx={{ m: 1, width: 200 }}>
      <InputLabel id="date-filter">Date</InputLabel>
      <Select
        labelId="date-filter"
        value={dateFilter}
        label="Date"
        onChange={(event) => setDateFilter(event.target.value)}
      >
        <MenuItem value={"anytime"}>Anytime</MenuItem>
        <MenuItem value={"today"}>Today</MenuItem>
        <MenuItem value={"in three days"}>In three days</MenuItem>
        <MenuItem value={"in a week"}>In a week</MenuItem>
      </Select>
    </FormControl>
  );

  const togglePostEventModal = () =>
    setIsPostEventModalOpen(!isPostEventModalOpen);

  return (
    <div className="landing" style={{ backgroundImage: `url(${Background})` }}>
      <div className="page-frame">
        <Navbar
          showCreateEventButton={true}
          toggleCreateEvent={togglePostEventModal}
        />
        <div className="content">
          <div className="header">
            <div className="title">Events near you</div>
            <div className="search-bar">
              {dateFilterSelector}
              <MultiSelect
                label="Filter category"
                options={categories}
                selected={categoryFilter}
                setSelected={setCategoryFilter}
                style={{ m: 1, width: 300 }}
              />
            </div>
          </div>
          <div className="events-wrapper">
            {events.map((e, idx) => (
              <EventCard
                onClick={() => setSelectedEventID(e.id)}
                key={idx}
                title={e.name}
                date={e.time}
                imgSrc={e.thumbnail}
                description={e.description}
              />
            ))}
          </div>
        </div>
        <Modal
          open={selectedEventID != undefined}
          onClose={() => setSelectedEventID(undefined)}
        >
          <div className="event-modal">
            <Event
              id={selectedEventID}
              profileOnClickEvent={(id) => setSelectedEventID(id)}
            />
          </div>
        </Modal>
        <Modal
          BackdropProps={{ style: { backdropFilter: "blur(10px)" } }}
          open={isPostEventModalOpen}
          onClose={togglePostEventModal}
        >
          <div>
            <PostEvent handleClose={togglePostEventModal} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
