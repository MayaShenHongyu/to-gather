import React from "react";
import "./EventCard.css";
import Landing1 from "../assets/landing1.jpg";

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
export default function EventCard({
  onClick,
  date = new Date(),
  title,
  description,
  imgSrc,
}) {
  // const date = Date.now();
  return (
    <div className="container" onClick={onClick}>
      <img src={imgSrc} />
      <div className="info">
        <div className="info-date">
          <div className="month">{monthNames[date.getMonth()]}</div>
          <div className="date">{date.getDate()}</div>
        </div>
        <div className="info-others">
          <div className="title truncate">{title}</div>
          <div className="subtitle truncate">{description}</div>
        </div>
      </div>
    </div>
  );
}
