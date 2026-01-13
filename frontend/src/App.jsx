import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import AdminApp from "./components/admin/Admin.jsx";
import "./App.css";
import AboutPage from "./pages/AboutPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import NewsPage from "./pages/News.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BookStorePage from "./pages/MyBooks.jsx";
import APIcall from "./components/APIcall.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/books" element={<BookStorePage />} />
        <Route path="/apicall" element={<APIcall />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
