import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Default from "./components/Default";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
