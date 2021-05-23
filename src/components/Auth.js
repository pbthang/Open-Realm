import React, { useEffect, useState } from "react";
import firebase from "../config/firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currUser }}>{children}</AuthContext.Provider>
  );
}
