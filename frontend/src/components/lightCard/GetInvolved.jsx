import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const GetInvolvedSection = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md animate-fadeIn">
      {/* Background Blur Elements */}
      <div className="absolute -top-30 -left-30 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-30 -right-30 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-200 p-6 bg-white">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl sm:text-1xl lg:text-3xl font-semibold text-blue-700 mb-2">
            Get Involved
          </h2>
          <p className="text-gray-700 text-base max-w-3xl leading-relaxed">
            Krishna Prasad Poudel is committed to public service, democratic
            values, and inclusive development. Progress is strongest when people
            actively participate—your voice, ideas, and involvement matter.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4 mb-4">
          {/* Card Item */}
          <div className="rounded-2xl p-6 border border-blue-300">
            <h3 className="font-semibold text-blue-700 mb-2">
              Community Engagement
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Actively working with local communities to understand real
              challenges and ensure policies reflect the needs of the people.
            </p>
          </div>

          {/* Card Item */}
          <div className="rounded-2xl p-6 border border-blue-300">
            <h3 className="font-semibold text-blue-700 mb-2">
              Democratic Values
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Strong belief in transparency, accountability, and participatory
              democracy as foundations for a stable and prosperous Nepal.
            </p>
          </div>

          {/* Card Item */}
          <div className="rounded-2xl p-6 border border-blue-300">
            <h3 className="font-semibold text-blue-700 mb-2">
              Policy & Development
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Focused on sustainable development, education, good governance,
              and economic opportunities that uplift every citizen.
            </p>
          </div>

          {/* Card Item */}
          <div className="rounded-2xl p-6 border border-blue-300">
            <h3 className="font-semibold text-blue-700 mb-2">
              Youth & Future Leadership
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Encouraging youth participation in politics and nation-building to
              shape a responsible, progressive future.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer">
            Join the Movement
          </button>

          <button
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact the Office
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

export default GetInvolvedSection;
