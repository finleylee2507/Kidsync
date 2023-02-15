import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useAuthState, useDbData} from "./utilities/firebase";

import Landing from "./components/Authentication/Landing";
import DependentsList from "./components/Dependents/DependentsList";
import UserDetails from "./components/createProfile/UserDetails";

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
                            <Navigate to="/dependents"/>
                        ) : (
                            <Landing allUsers={dbUsers}/>
                        )
                    }
                ></Route>
                <Route path="/create-profile" element={<UserDetails/>}></Route>
                <Route path="/dependents" element={<DependentsList/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
