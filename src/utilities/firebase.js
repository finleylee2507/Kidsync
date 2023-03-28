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
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getDownloadURL,
  getStorage,
  ref as sRef,
  uploadBytes,
} from "firebase/storage";

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
const storage = getStorage();
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
export const addNewUser = async (newUser, uemail, uid) => {
  let isAddUserSuccessful = false;
  let isAddEmailIDSuccessful = false;
  try {
    await set(ref(database, "users/" + uid), newUser);
    isAddUserSuccessful = true;
  } catch (error) {
    console.log("Firebase error while writing into users table: ", error);
  }

  try {
    await set(ref(database, "emailToID/" + uemail), uid);
    isAddEmailIDSuccessful = true;
  } catch (error) {
    console.log("Firebase error while writing into emailToID table: ", error);
  }

  return isAddUserSuccessful && isAddEmailIDSuccessful;
};

//Update existing user
export const updateUser = async (newUser, uid) => {
  const userRef = child(ref(database), "users/" + uid);
  let isUpdateSuccessful = false;
  try {
    await update(userRef, newUser);
    isUpdateSuccessful = true;
  } catch (error) {
    console.log(error);
  }

  return isUpdateSuccessful;
};

// Get a new key for a dependent
export const getNewDependentKey = () => {
  const dependentKey = push(child(ref(database), "dependents"));
  return dependentKey.key;
};

// Add new dependent to the dependents table in the database
export const addNewDependent = async (
  newDependent,
  updatedUserDependents,
  did,
  uid
) => {
  let isAddSuccessful = false;
  try {
    // Create a new entry in the dependents table
    await set(ref(database, "dependents/" + did), newDependent);

    // Update the user object
    const userDependentsRef = child(ref(database), `users/${uid}`);
    await update(userDependentsRef, updatedUserDependents);
    isAddSuccessful = true;
  } catch (error) {
    console.log(error);
  }

  return isAddSuccessful;
};

//Update existing dependent
export const updateDependent = async (newDependent, did) => {
  const dependentRef = child(ref(database), "dependents/" + did);
  let isUpdateSuccessful = false;
  try {
    await update(dependentRef, newDependent);
    isUpdateSuccessful = true;
  } catch (error) {
    console.log(error);
  }

  return isUpdateSuccessful;
};

//Delete dependent
export const deleteDependent = async (did) => {
  let isSuccessful = false;
  try {
    await remove(ref(database, "dependents/" + did));
    isSuccessful = true;
  } catch (error) {
    console.log(error);
  }

  return isSuccessful;
};

export const addNewClient = async (
  updatedUserClients,
  updatedDependentCaretakers,
  cid,
  did
) => {
  let isAddSuccessful = false;

  try {
    const userClientsRef = child(ref(database), `users/${cid}`);
    const dependentCaretakerRef = child(ref(database), `dependents/${did}`);
    await update(userClientsRef, updatedUserClients);
    await update(dependentCaretakerRef, updatedDependentCaretakers);

    isAddSuccessful = true;
  } catch (error) {
    console.log(error);
  }

  return isAddSuccessful;
};

//FILE STORAGE FUNCTIONS
export const uploadFile = async (file, directory) => {
  let fileLink = `${directory}/${file.name}`;
  let downloadURL = "";
  let isSuccessful = false;
  const imageReference = sRef(storage, fileLink);

  try {
    await uploadBytes(imageReference, file);
    downloadURL = await getDownloadURL(imageReference);
    console.log("File upload successful");
    isSuccessful = true;
  } catch (err) {
    console.log("Error: " + err);
  }

  return [isSuccessful, downloadURL];
};

/* USER AUTHENTICATION FUNCTIONS */

// Open Google sign in popup and sign in the user
export const signInWithGoogle = async () => {
  await signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

//Create a email, password based account
export const createUserAccountWithEmail = async (email, password) => {
  const auth = getAuth();
  let creationResult = false;
  let error = null;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    creationResult = true;
  } catch (e) {
    error = e;
  }

  return [creationResult, error];
};

//Check if the user (assumed existed) is authenticated through email and password or third party
export const isAuthenticatedThroughThirdParty = (user) => {
  let isThirdParty = false;

  const providerData = user.providerData;
  if (providerData && providerData.length > 0) {
    for (let i = 0; i < providerData.length; i++) {
      const providerId = providerData[i].providerId;
      if (providerId !== "password") {
        // User is authenticated with third-party provider
        isThirdParty = true;
        break;
      }
    }
  }
  return isThirdParty;
};
// Sign in user using email authentication
export const signInWithEmail = async (email, password) => {
  const auth = getAuth();
  let signInResult = false;
  let error = null;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    signInResult = true;
  } catch (e) {
    error = e;
  }

  return [signInResult, error];
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

//De-authenticate a user
export const deAuthenticateUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    await deleteUser(user);
  } catch (error) {
    console.log("Error while de-authenticating user: ", error);
  }
};
// Clear entire database of all unessential fields
export const clearDatabase = () => {
  console.log("Clearing database");

  const data = {
    dependents: {
      0: "Initialize",
    },
    emailToID: {
      0: "Initialize",
    },
    users: {
      0: "Initialize",
    },
  };

  // Update messages and users tables in database with above data
  update(ref(database), data);
};
