import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import MultiSelect from "../components/MultiSelect";
import EventCard from "../components/EventCard";
import BannerImage from "../assets/friends.png";
// import Footer from "../components/Footer";
import { getFilteredEvents, upLoadImage } from "../backend";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

import "./Dashboard.css";

const categories = ["Sports", "Kids", "Music", "Board Games"];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateFilter, setDateFilter] = useState();
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   createEvent(currentUser.uid, {
  //     name: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
  //     description:
  //       "We’ll get you directly seated and inside for you to enjoy the show.",
  //     time: new Date(2021, 3, 20),
  //     thumbnail: BannerImage,
  //   });
  // }, []);

  useEffect(() => {
    getFilteredEvents(selectedCategories).then((events) => setEvents(events));
  }, [selectedCategories]);

  return (
    <div className="landing" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="page-frame">
        <Navbar />
        <div className="content">
          <div className="header">
            <div className="title">Events near you</div>
            <div className="search-bar">
              <FormControl size="small" sx={{ m: 1, width: 200 }}>
                <InputLabel id="date-filter">Date</InputLabel>
                <Select
                  labelId="date-filter"
                  value={dateFilter}
                  label="Date"
                  onChange={(event) => setDateFilter(event.target.value)}
                >
                  <MenuItem value={10}>Today</MenuItem>
                  <MenuItem value={20}>In three days</MenuItem>
                  <MenuItem value={30}>In a week</MenuItem>
                </Select>
              </FormControl>
              <MultiSelect
                label="Filter category"
                options={categories}
                selected={selectedCategories}
                setSelected={setSelectedCategories}
              />
            </div>
          </div>
          <div className="events-wrapper">
            {events.map((e, idx) => (
              <EventCard
                key={idx}
                title={e.name}
                date={e.time}
                imgSrc={e.thumbnail}
                description={e.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
