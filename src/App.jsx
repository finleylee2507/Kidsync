import { React } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthState, useDbData } from "./utilities/firebase";

import Landing from "./components/Authentication/Landing";
import DependentsList from "./components/Dependents/DependentsList";
import UserDetails from "./components/CreateProfile/UserDetails";
import CreateDependentProfileForm from "./components/CreateAndEditDependentProfile/CreateDependentProfileForm";
import { Navbar } from "./components/Navbar/Navbar";
import ViewDependent from "./components/Dependents/ViewDependent";
import ClientsList from "./components/Sitters/ClientsList";
import HomePage from "./components/Home/HomePage";
import EditDependentProfileForm from "./components/CreateAndEditDependentProfile/EditDependentProfileForm";
import { ToastContainer } from "react-toastify";
import ViewInformation from "./components/Sitters/ViewInformation";

const App = () => {
  const user = useAuthState();
  const [dbUsers, dbUsersError] = useDbData("/users");
  const [dbDependents, dbDependentsError] = useDbData("/dependents");

  if (dbUsersError) {
    console.log(
      "Here was the error in getting the users from the database: ",
      dbUsersError
    );
  } else if (dbDependentsError) {
    console.log(
      "Here was the error in getting the dependents from the database: ",
      dbDependentsError
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user && dbUsers && dbUsers[user.uid] ? (
              <Navigate to="/home" />
            ) : (
              <Landing allUsers={dbUsers} />
            )
          }
        ></Route>
        <Route
          path="/create-profile"
          element={
            <div>
              <ToastContainer position="top-right" autoClose={1000} />
              <UserDetails user={user} />
            </div>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <div>
              <Navbar />
              <HomePage
                user={user}
                allUsers={dbUsers}
                allDependents={dbDependents}
              />
            </div>
          }
        ></Route>
        <Route
          path="/dependents"
          element={
            <div>
              <ToastContainer position="top-right" autoClose={1000} />
              <Navbar />
              <DependentsList
                user={user}
                allUsers={dbUsers}
                allDependents={dbDependents}
              />
            </div>
          }
        ></Route>
        <Route
          path="/view-dependent"
          element={
            <div>
              <ToastContainer position="top-right" autoClose={1000} />
              <Navbar />
              <ViewDependent />
            </div>
          }
        ></Route>
        <Route
          path="/view-information"
          element={
            <div>
              <ToastContainer position="top-right" autoClose={1000} />
              <Navbar />
              <ViewInformation />
            </div>
          }
        ></Route>
        <Route
          path="/clients"
          element={
            <div>
              <Navbar />
              <ClientsList />
            </div>
          }
        ></Route>
        <Route
          path="/create-dependents-profile"
          element={
            <div>
              <ToastContainer position="top-right" autoClose={1000} />
              <Navbar />
              <CreateDependentProfileForm user={user} allUsers={dbUsers} />
            </div>
          }
        ></Route>

        <Route
          path="/edit-dependents-profile"
          element={
            <div>
              <ToastContainer position="top-right" autoClose={1000} />
              <Navbar />
              <EditDependentProfileForm user={user} allUsers={dbUsers} />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
