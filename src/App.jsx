import { React } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthState, useDbData } from "./utilities/firebase";

import Landing from "./components/Authentication/Landing";
import DependentsList from "./components/Dependents/DependentsList";
import UserDetails from "./components/UserProfile/UserDetails";
import CreateDependentProfileForm from "./components/DependentProfile/CreateDependentProfileForm";
import { Navbar } from "./components/Navbar/Navbar";
import ViewDependent from "./components/Dependents/ViewDependent";
import ClientsList from "./components/Sitters/ClientsList";
import HomePage from "./components/Home/HomePage";
import EditDependentProfileForm from "./components/DependentProfile/EditDependentProfileForm";
import { ToastContainer } from "react-toastify";
import ViewInformation from "./components/Sitters/ViewInformation";
import ProfileSettings from "./components/UserProfile/ProfileSettings";
import SignUpWithEmail from "./components/Authentication/SignUpWithEmail";
import ResetPasswordWithEmail from "./components/Authentication/ResetPasswordWithEmail";
import ErrorBoundary from "./components/Errors/ErrorBoundary";

const App = () => {
  const user = useAuthState();
  const [dbUsers, dbUsersError] = useDbData("/users");
  const [dbDependents, dbDependentsError] = useDbData("/dependents");
  const [dbEmailToID, dbEmailToIDError] = useDbData("/emailToID");
  console.log("user: ", user);
  console.log("db users: ", dbUsers);
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
  } else if (dbEmailToIDError) {
    console.log(
      "Here was the error in getting the email to ID mapping from the database",
      dbEmailToIDError
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ToastContainer position="top-right" autoClose={2000} />
                <Landing allUsers={dbUsers} />
              </>
            }
          ></Route>

          <Route
            path="/sign-up-with-email"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <SignUpWithEmail />
              </div>
            }
          ></Route>

          <Route
            path="/reset-password"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <ResetPasswordWithEmail />
              </div>
            }
          ></Route>
          <Route
            path="/create-profile"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <UserDetails user={user} allUsers={dbUsers} />
              </div>
            }
          ></Route>
          <Route
            path="/profile-settings"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <ProfileSettings user={user} allUsers={dbUsers} />
              </div>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <Navbar user={user} allUsers={dbUsers} />
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
                <Navbar user={user} allUsers={dbUsers} />
                <DependentsList
                  user={user}
                  allUsers={dbUsers}
                  allDependents={dbDependents}
                  emailToIDMapping={dbEmailToID}
                />
              </div>
            }
          ></Route>
          <Route
            path="/view-dependent"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <Navbar user={user} allUsers={dbUsers} />
                <ViewDependent />
              </div>
            }
          ></Route>
          <Route
            path="/view-information"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <Navbar user={user} allUsers={dbUsers} />
                <ViewInformation />
              </div>
            }
          ></Route>
          <Route
            path="/clients"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <Navbar user={user} allUsers={dbUsers} />
                <ClientsList
                  user={user}
                  allUsers={dbUsers}
                  allDependents={dbDependents}
                />
              </div>
            }
          ></Route>
          <Route
            path="/create-dependents-profile"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <Navbar user={user} allUsers={dbUsers} />
                <CreateDependentProfileForm user={user} allUsers={dbUsers} />
              </div>
            }
          ></Route>

          <Route
            path="/edit-dependents-profile"
            element={
              <div>
                <ToastContainer position="top-right" autoClose={1000} />
                <Navbar user={user} allUsers={dbUsers} />
                <EditDependentProfileForm user={user} allUsers={dbUsers} />
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
