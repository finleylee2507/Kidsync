import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Default from "./components/Default";

const App = () => {
  // Establish routes for the different screens on our web app
  return (
    <BrowserRouter>
      <Routes>
        <Route // The landing page of our application
          path="/"
          element={
            <div>
              <Default />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
