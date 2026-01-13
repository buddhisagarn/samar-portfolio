import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutSection from "../components/About.jsx";
import Home from "../components/Home.jsx";

export default function LandingPage() {
  return (
    <div>
      <NavBar />
      <Home />
      <Footer />
      <AboutSection />
    </div>
  );
}

