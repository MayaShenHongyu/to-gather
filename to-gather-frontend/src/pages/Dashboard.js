import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import MultiSelect from "../components/MultiSelect";
import EventCard from "../components/EventCard";
import BannerImage from "../assets/friends.png";
// import Footer from "../components/Footer";
import { createEvent } from "../backend";
import "./Dashboard.css";

const categories = ["Sports", "Kids", "Music", "Board Games"];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className="landing" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="page-frame">
        <Navbar />
        <div className="content">
          <div className="header">
            <div className="title">Events near you</div>
            <div className="search-bar">
              <MultiSelect
                label="Filter category"
                options={categories}
                selected={selectedCategories}
                setSelected={setSelectedCategories}
              />
            </div>
          </div>
          <div className="events-wrapper">
            <EventCard
              title="Wonder Girls 2010 Wonder Girls World Tour San Francisco"
              description="We’ll get you directly seated and inside for you to enjoy the show."
              date={new Date(2021, 3, 20)}
            />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
    </div>
  );
}
