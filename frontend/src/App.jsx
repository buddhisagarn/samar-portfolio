import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import APIcall from "./components/APIcall.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<APIcall />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
