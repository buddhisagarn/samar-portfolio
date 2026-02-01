// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/api/api";
import AboutSection from "@/components/About";

export default function AboutPage() {
  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState(null);

  /* ---------------- FETCH FROM DB ---------------- */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get("/about");
        setAboutData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAbout();
  }, []);

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <section className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800">
        {/* ---------------- HERO ---------------- */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
              {aboutData.title}
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {aboutData.about}
            </h1>

            <p className="mt-6 text-gray-600 max-w-xl">
              {aboutData.description}
            </p>

            {/* Socials */}
            <div className="flex gap-4 mt-8">
              <a className="p-3 rounded-full bg-white shadow hover:scale-105 transition">
                <FaGithub size={20} className="text-blue-700" />
              </a>
              <a className="p-3 rounded-full bg-white shadow hover:scale-105 transition">
                <FaLinkedin size={20} className="text-blue-700" />
              </a>
              <a className="p-3 rounded-full bg-white shadow hover:scale-105 transition">
                <FaTwitter size={20} className="text-blue-700" />
              </a>
            </div>
          </motion.div>

          {/* ---------------- IMAGE CARD ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl max-w-sm">
              <img
                src={aboutData.image}
                alt="About"
                className="w-full h-72 object-cover rounded-2xl mb-4"
              />
              <p className="text-center text-sm text-gray-600">
                {aboutData.pictitle}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------------- SKILLS / VALUES ---------------- */}
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              What I <span className="text-blue-700">Care About</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {aboutData.skill?.map((item, index) => (
                <ValueCard key={index} title={item.title} text={item.about} />
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- CTA ---------------- */}
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold mb-4">
            Let’s build something meaningful.
          </h3>
          <p className="text-gray-600 mb-6">
            Open to collaborations, freelance work, and interesting ideas.
          </p>
          <button
            className="px-8 py-3 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Get in touch
          </button>
        </div>
      </section>
      <AboutSection />
    </div>
  );
}

/* ---------------- VALUE CARD ---------------- */
function ValueCard({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-blue-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold mb-3 text-blue-700">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </motion.div>
  );
}
