import React, { useContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { addNewUser } from "../backend";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const register = async (email, password, userProps) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addNewUser(user.uid, email, userProps);
    return await sendEmailVerification(user);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    isLoading,
    logIn,
    logOut,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
