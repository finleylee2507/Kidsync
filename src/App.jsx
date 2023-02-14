import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState, useDbData } from "./utilities/firebase";

import Landing from "./components/Authentication/Landing";
import CreateProfileForm from "./components/createProfile/CreateProfileForm";
import DependentsList from "./components/Dependents/DependentsList";

const App = () => {
  const user = useAuthState();
  const [dbUsers, dbUsersError] = useDbData("/users");

  if (dbUsersError) {
    console.log(
      "Here was the error in getting users from the database: ",
      dbUsersError
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user && dbUsers && dbUsers[user.uid] ? (
              <Navigate to="/dependents" />
            ) : (
              <Landing allUsers={dbUsers} />
            )
          }
        ></Route>
        <Route path="/create-profile" element={<CreateProfileForm />}></Route>
        <Route path="/dependents" element={<DependentsList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
