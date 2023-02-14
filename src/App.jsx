import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Default from "./components/Default";
import CreateProfileForm from "./components/createProfile/CreateProfileForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />}></Route>
      </Routes>

        <Routes>
            <Route path="/create-profile" element={<CreateProfileForm/>}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
