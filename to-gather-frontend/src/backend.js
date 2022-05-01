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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

const USERS = "users";
const EVENTS = "events";

const processEventSnap = (eventSnap) => {
  const e = eventSnap.data();
  return { ...e, time: e.time.toDate(), id: eventSnap.id };
};

export const getEvent = async (eventID, setEvent) => {
  const eventRef = doc(db, EVENTS, eventID);
  const eventSnap = await getDoc(eventRef);
  if (eventSnap.exists()) {
    setEvent(processEventSnap(eventSnap));
  } else {
    throw "Event does not exist.";
  }
};

export const getUser = async (
  userID,
  setUser,
  setHosting = undefined,
  setParticipating = undefined
) => {
  const userRef = doc(db, USERS, userID);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const user = userSnap.data();
    setUser({ ...user, uid: userSnap.id });
    if (setHosting) {
      const eventSnaps = await Promise.all(
        user.hosting.map((eventID) => {
          const eventRef = doc(db, EVENTS, eventID);
          return getDoc(eventRef);
        })
      );
      const events = eventSnaps
        .filter((snap) => snap.exists())
        .map(processEventSnap);
      setHosting(events);
    }
    if (setParticipating) {
      const eventSnaps = await Promise.all(
        user.participating.map((eventID) => {
          const eventRef = doc(db, EVENTS, eventID);
          return getDoc(eventRef);
        })
      );
      const events = eventSnaps
        .filter((snap) => snap.exists())
        .map(processEventSnap);
      setParticipating(events);
    }
  } else {
    throw "User does not exist.";
  }
};

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
    participating: [],
    hosting: [],
  });

export const uploadImage = async (storagePath, imagedata) => {
  const imgRef = ref(storage, storagePath);
  await uploadBytes(imgRef, imagedata);
  const url = await getDownloadURL(imgRef);
  console.log(url);
  return url;
};

export const createEvent = async (
  hostID,
  {
    name,
    time,
    thumbnail,
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

  const thumbnailURL = await uploadImage(eventRef.id, thumbnail);
  await updateDoc(eventRef, {
    thumbnail: thumbnailURL,
  });

  const userRef = doc(db, USERS, hostID);
  await updateDoc(userRef, {
    hosting: arrayUnion(eventRef.id),
  });
};

export const joinEvent = async (userID, eventID) => {
  const userRef = doc(db, USERS, userID);
  const eventRef = doc(db, EVENTS, eventID);
  await updateDoc(userRef, {
    participating: arrayUnion(eventID),
  });
  await updateDoc(eventRef, {
    participants: arrayUnion(userID),
  });
};

export const withdrawFromEvent = async (userID, eventID) => {
  const userRef = doc(db, USERS, userID);
  const eventRef = doc(db, EVENTS, eventID);
  await updateDoc(userRef, {
    participating: arrayRemove(eventID),
  });
  await updateDoc(eventRef, {
    participants: arrayRemove(userID),
  });
};

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
      participating: arrayRemove(eventID),
    });
  });

  await deleteDoc(eventRef);
};

export const getFilteredEvents = async (tags, beforeTime) => {
  const queryConstraints = [];
  queryConstraints.push(where("time", ">=", new Date()));
  if (tags.length != 0) {
    queryConstraints.push(where("tags", "array-contains-any", tags));
  }
  if (beforeTime) {
    queryConstraints.push(where("time", "<", beforeTime));
  }
  const q = query(collection(db, EVENTS), ...queryConstraints);
  const filteredEvents = await getDocs(q);

  return filteredEvents.docs.map(processEventSnap);
};
