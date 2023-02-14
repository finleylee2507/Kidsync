import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/Authentication/Landing";
import CreateProfileForm from "./components/createProfile/CreateProfileForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
      </Routes>

      <Routes>
        <Route path="/create-profile" element={<CreateProfileForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
