import {
  setDoc,
  doc,
  addDoc,
  getDoc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
  deleteDoc,
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
    eventList: [],
    hosting: [],
  });

export const createEvent = async (
  hostID,
  {
    name,
    time,
    description = null,
    location = null,
    tags = [],
    preferredGroupSize = null,
  }
) => {
  const eventRef = await addDoc(collection(db, EVENTS), {
                          hostID,
                          name,
                          time,
                          description,
                          location,
                          preferredGroupSize,
                          tags,
                          participants: [],
                        });

  const userRef = doc(db, USERS, hostID);
  await updateDoc(userRef, {
    hosting: arrayUnion(eventRef.id),
  });
}

export const signUpForEvent = async (userID, eventID) => {
  const userRef = doc(db, USERS, userID);
  const eventRef = doc(db, EVENTS, eventID);
  await updateDoc(userRef, {
    eventList: arrayUnion(eventID),
  });
  await updateDoc(eventRef, {
    participants: arrayUnion(userID),
  }); 
};

export const withdrawFromEvent= async (userID, eventID) => {
  const userRef = doc(db, USERS, userID);
  const eventRef = doc(db, EVENTS, eventID);
  await updateDoc(userRef, {
    eventList: arrayRemove(eventID),
  });
  await updateDoc(eventRef, {
    participants: arrayRemove(userID),
  }); 
}

export const deleteEvent = async (eventID) => {
  const eventRef = doc(db, EVENTS, eventID);
  const eventDoc = await getDoc(eventRef);
  const eventData = eventDoc.data();

  const hostID = eventData.hostID;
  const hostRef = doc(db, USERS, hostID);
  await updateDoc(hostRef, {
    hosting: arrayRemove(eventID),
  });

  const participants = eventData.participants;
  participants.forEach(async (id) => {
    const userRef = doc(db, USERS, id);
    await updateDoc(userRef, {
      eventList: arrayRemove(eventID),
    });
  });

  await deleteDoc(eventRef);
}

export const filterEvent = async (tags) => {
  const q = query(collection(db, EVENTS), where("tags", "array-contains-any", tags));
  const filteredEvent = await getDocs(q);

  //filteredEvent.forEach((e) => console.log(e.id));

  return filteredEvent;
}

