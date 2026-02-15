import React, { useState, useEffect } from "react";
import { FaYoutube, FaSearch, FaChevronRight } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/About";

const API_KEY = "AIzaSyCaf23T408pmwosFBKByrSepC_xsxjmtu0";
const CHANNEL_ID = "UCZx__zfyaDEmdiwAQe3LiiQ";
const MAX_RESULTS = 9;

export default function PoliticianYoutube() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch videos from YouTube API
  const fetchVideos = async (pageToken = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&pageToken=${pageToken}`,
      );
      const data = await res.json();
      const newVideos = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
      setVideos((prev) => [...prev, ...newVideos]);
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Filter videos by search
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 p-5 md:p-10 mt-20 max-w-7xl m-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-blue-800 flex items-center gap-3">
            <FaYoutube className="text-red-600" /> On Youtube
          </h1>
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Video Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredVideos.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No videos found.
            </p>
          ) : (
            filteredVideos.map((video) => (
              <motion.a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-blue-800 mb-2">
                    {video.title}
                  </h2>
                  <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Watch Now <FaChevronRight />
                  </button>
                </div>
              </motion.a>
            ))
          )}
        </motion.div>

        {/* Load More Button */}
        {nextPageToken && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => fetchVideos(nextPageToken)}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-600">
          © {new Date().getFullYear()} Krishna Prasad Poudel Channel
        </footer>
      </div>
      <AboutSection />
    </div>
  );
}
