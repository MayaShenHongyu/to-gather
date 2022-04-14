import {
  setDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";

const USERS = "users";
const EVENTS = "events";

export const addNewUser = (
  userID,
  email,
  { firstName, lastName, gender, bio = null, profilePic = null }
) =>
  setDoc(doc(db, USERS, userID), {
    email,
    firstName,
    lastName,
    gender,
    bio,
    profilePic,
    wishlist: [],
    hosting: [],
  });

export const createEvent = (
  hostID,
  {
    name,
    time,
    description = null,
    location = null,
    tags = [],
    preferredGroupSize = null,
  }
) =>
  addDoc(collection(db, EVENTS), {
    hostID,
    name,
    time,
    description,
    location,
    tags,
    preferredGroupSize,
    participants: [],
  });

export const signUpForEvent = async (userID, eventID) => {
  const userRef = doc(db, USERS, userID);
  const eventRef = doc(db, EVENTS, eventID);
  await updateDoc(userRef, {
    wishlist: arrayUnion(eventID),
  });
  await updateDoc(eventRef, {
    participants: arrayUnion(userID),
  });
};
