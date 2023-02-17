import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthState, useDbData } from "./utilities/firebase";

import Landing from "./components/Authentication/Landing";
import DependentsList from "./components/Dependents/DependentsList";
import UserDetails from "./components/CreateProfile/UserDetails";
import { Navbar } from "./components/Navbar/Navbar";
import ViewDependent from "./components/Dependents/ViewDependent";

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
        <Route
          path="/create-profile"
          element={
            <div>
              <Navbar />
              <UserDetails />
            </div>
          }
        ></Route>
        <Route
          path="/dependents"
          element={
            <div>
              <Navbar />
              <DependentsList />
            </div>
          }
        ></Route>
        <Route
          path="/view-dependent"
          element={
            <div>
              <Navbar />
              <ViewDependent />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
