import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/Authentication/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
