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
import ScrollToTop from "./components/ScrollToTop.jsx";
import AdminBook from "./components/admin/AdminBooks.jsx";
import ProtectedRoute from "./Routes/ProtectedAdminRoute.jsx";
import Login from "./components/admin/AdminLogin.jsx";
import AdminEvents from "./components/admin/EventsPage.jsx";
import AdminContact from "./components/admin/AdminContact.jsx";
import AdminAbout from "./components/admin/AdminAbout.jsx";
import AdminNews from "./components/admin/AdminNews.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import TrendingTechnology from "./components/lightCard/TrendingTech.jsx";
import ReadArticle from "./components/lightCard/ReadArticle.jsx";
import AdminEmailDashboard from "./components/admin/AdminEmailDashboard.jsx";
import AdminDashboard from "./components/admin/AdminLearnMore.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/books" element={<BookStorePage />} />
        <Route path="/apicall" element={<APIcall />} />
        <Route path="/trending-tech" element={<TrendingTechnology />} />
        <Route path="/articles/:id" element={<ReadArticle />} />

        <Route
          path="/admin-home"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminApp />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-event"
          element={
            <ProtectedRoute>
              <AdminLayout>
                {" "}
                <AdminEvents />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-contact"
          element={
            <ProtectedRoute>
              <AdminLayout>
                {" "}
                <AdminContact />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-about"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminAbout />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-news"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminNews />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-book"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminBook />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-subscribe"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminEmailDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-learn-more"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
