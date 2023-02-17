// Firebase Functionality

import { useEffect, useState } from "react";

// Import Firebase SDK functions
import { initializeApp } from "firebase/app";

import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Firebase configuration data
const firebaseConfig = {
  apiKey: "AIzaSyDESRVoJEwuvdknNdmgnGBwltHTb3aczVs",
  authDomain: "yourturn-bb7ce.firebaseapp.com",
  projectId: "yourturn-bb7ce",
  storageBucket: "yourturn-bb7ce.appspot.com",
  messagingSenderId: "1076832014151",
  appId: "1:1076832014151:web:65b1d2310a74241abdc662",
  measurementId: "G-02K6C9LSJ1",
};

// Initialize Firebase and database
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

/* DATABASE FUNCTIONS */

// Get data from a specific path in the entire database
export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

// Add new user to the user table in the database
export const addNewUser = (newUser, uid) => {
  set(ref(database, "users/" + uid), newUser);
};

// Get a new key for a dependent
export const getNewDependentKey = () => {
  const dependentKey = push(child(ref(database), "dependents"));
  return dependentKey.key;
};

// Add new dependent to the dependents table in the database
export const addNewDependent = (
  newDependent,
  updatedUserDependents,
  did,
  uid
) => {
  // Create a new entry in the dependents table
  set(ref(database, "dependents/" + did), newDependent);

  // Update the user object
  const userDependentsRef = child(ref(database), `users/${uid}`);
  update(userDependentsRef, updatedUserDependents);
};

/* USER AUTHENTICATION FUNCTIONS */

// Open Google sign in popup and sign in the user
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

// Sign out the user
const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };

// Get the authentication state of the user (is the user signed in or not)
// If user is signed in, return value is a Google user object (console.log to see all)
export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return user;
};
