import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const LearnMoreSection = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md animate-fadeIn">
      {/* Background Blur Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative  w-full  backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200 p-6 sm:p-10 transition-transform hover:scale-[1.02] bg-white max-w-3xl max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
          Learn More About Me
        </h2>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
          I am Krishna Prasad Poudel, a dedicated public servant committed to
          the progress and prosperity of my community and nation. My journey has
          been shaped by a deep belief in integrity, accountability, and
          people-centered leadership. From an early stage in my life, I
          understood that true leadership is not about power, but about
          responsibility — the responsibility to listen, to act, and to serve.
          Throughout my political career, I have focused on strengthening
          democratic values, promoting inclusive development, and ensuring that
          the voices of ordinary citizens are heard and respected. I believe
          that sustainable progress comes from education, transparent
          governance, youth empowerment, and economic opportunity for all. My
          work has always been guided by the principle that development must
          reach every household, not just remain in policy documents. I consider
          myself a bridge between tradition and modern vision — respecting our
          cultural roots while embracing innovation and reform. Challenges have
          never discouraged me; instead, they have strengthened my resolve to
          work harder for meaningful change. My commitment remains firm: to
          serve with honesty, lead with courage, and contribute toward building
          a just, prosperous, and united society for present and future
          generations.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={() => navigate("/books")}
          >
            Books I’ve Read
          </button>
          <button
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact Me
          </button>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
