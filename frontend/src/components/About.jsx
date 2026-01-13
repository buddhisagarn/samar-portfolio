// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
export default function AboutSection() {
  return (
    <section className="relative bg-linear-to-br from-blue-900 to-blue-700 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-blue-200">Me</span>
          </h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            I’m a passionate developer who loves building clean, scalable, and
            user‑friendly web experiences. I enjoy turning complex problems into
            simple, beautiful solutions.
          </p>
          <p className="text-blue-100 leading-relaxed mb-6">
            Currently focused on modern web technologies, performance‑driven
            design, and crafting products that actually make people say
            <span className="italic"> “this feels good to use.”</span>
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="mailto:your@email.com"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </motion.div>

        {/* Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-xl font-semibold mb-3">Quick Snapshot</h3>
          <ul className="space-y-3 text-blue-100">
            <li>Building modern React & MERN apps</li>
            <li>Clean UI, smooth UX, blue‑themed vibes</li>
            <li>Performance + scalability focused</li>
            <li>Always learning, always improving</li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-blue-200 text-sm">
        © {new Date().getFullYear()} • Built with passion & a lot of coffee ☕
      </div>
    </section>
  );
}
