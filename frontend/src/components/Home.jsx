import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await API.get("/content");
        setContent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContent();
  }, []);

  return (
    <div
      className=" relative 
   overflow-hidden min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800 p-2 pt-15"
    >
      {/* Hero Section */}
      <div className="absolute -top-30 -left-30 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-30 -right-30 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl"></div>
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        {content && (
          <div>
            <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
              🇳🇵 Nepalese Developer
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {content.name?.split(" ")[0]}{" "}
              <span className="text-blue-700">
                {content.name?.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-xl">{content.description}</p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-4">
              <StatBox value={content.years} label="Years of Service" />
              <StatBox value={content.terms} label="Manager Terms" />
              <StatBox value={content.roles} label="Leadership Roles" />
            </div>

            {/* CTA */}
            <div className="mt-10 flex gap-4">
              <button
                className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition cursor-pointer"
                onClick={() => navigate("/learn-more")}
              >
                Learn More
              </button>
              <button
                className="px-6 py-3 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                onClick={() => navigate("/get-involved")}
              >
                Get Involved
              </button>
            </div>
          </div>
        )}

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <img
              src="/about.jpg"
              alt="Giriraj Mani Pokhrel"
              className="w-72 md:w-96 md:h-96 rounded-2xl shadow-xl object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 rounded-b-2xl">
              Samar Prasad Bhattarai – Senior Developer and Project manager in
              Google
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className=" py-15">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-wider rounded-full bg-blue-100 text-blue-700">
            EXPERIENCE & LEADERSHIP
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A Legacy of <span className="text-blue-700">Public Service</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hands-on experience building full-stack web applications using the
            different languages, with a strong focus on practical
            problem-solving, clean architecture, and real-world project
            development.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

function StatBox({ value, label }) {
  return (
    <div className="px-5 py-4 bg-white rounded-xl shadow-sm text-center min-w-35">
      <div className="text-2xl font-bold text-blue-700">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
