import React from "react";
import Navbar from "../components/Navbar";
import { createEvent, signUpForEvent, withdrawFromEvent, deleteEvent, filterEvent } from "../backend";

function Profile() {
  let hostId = "RiKHbcE79XM1PORvZS747fgg0Er2";
  let eventObj = {
                name: "eventbyAndy",
                time: 5,
                description: null,
                location: null,
                tags: ['Sports', 'Music'],
                preferredGroupSize: null,
              };

    let userId = "DPi0ZXMac3YHWQNxiWBwhaQu8Xi2";
    let eventId = "AowoQxJCvxZv1gsXYanz";

  return (
    <>
      <Navbar />

      <h1>Profile Page (currently for backend api testing purpose)</h1>

      <button onClick = {() => {
        createEvent(hostId, eventObj);
        console.log("add event!");
      }}> addEvent </button>

      <button onClick = {() => {
        signUpForEvent(userId, eventId);
        console.log("sign up for event!");
      }}> signUpForEvent </button>

      <button onClick = {() => {
        withdrawFromEvent(userId, eventId);
        console.log("withdraw event!");
      }}> withdrawFromEvent </button>

      <button onClick = {() => {
        deleteEvent(eventId);
        console.log("delete event!");
      }}> deleteEvent </button>

      <button onClick = {() => {
        filterEvent(['Sports']);
        console.log("filter event!");
      }}> filterEvent </button>
    </>

  );
}

export default Profile;
