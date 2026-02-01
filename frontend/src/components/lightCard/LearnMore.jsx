import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const LearnMoreSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 overflow-hidden">
      {/* Background Blur Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative max-w-xl w-full  backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200 p-6 sm:p-10 transition-transform hover:scale-[1.02]">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
          Learn More About Me
        </h2>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
          I’m a full-stack developer who enjoys building scalable web apps,
          solving real-world problems, and constantly leveling up my skills. I
          focus on clean code, performance, and user-first design.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={() => navigate("/books")}
          >
            View Projects
          </button>
          <button
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact Me
          </button>
          <button
            className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            {" "}
            <FaArrowLeft />
            Back Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
