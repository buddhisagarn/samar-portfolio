import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import API from "@/api/api";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/footer");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load about data", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="bg-linear-to-br from-blue-900 to-blue-800 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">{data.name}</h2>
          <p className="text-blue-200 mb-2 text-xs">{data.role}</p>

          <p className="text-blue-100 mb-4">{data.bio1}</p>
          <p className="text-blue-100 mb-6">{data.bio2}</p>

          <blockquote className="italic text-blue-200 border-l-4 pl-4 mb-6">
            “{data.vision}”
          </blockquote>

          <div className="flex gap-4">
            {" "}
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {" "}
              <FaGithub size={20} />{" "}
            </a>{" "}
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {" "}
              <FaLinkedin size={20} />{" "}
            </a>{" "}
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {" "}
              <FaTwitter size={20} />{" "}
            </a>{" "}
            <a
              href="mailto:your@email.com"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {" "}
              <FaEnvelope size={20} />{" "}
            </a>{" "}
          </div>
        </motion.div>

        {/* SNAPSHOT */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-xl font-semibold mb-3">Quick Snapshot</h3>
          <ul className="space-y-3 text-blue-100">
            {data.highlights.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
