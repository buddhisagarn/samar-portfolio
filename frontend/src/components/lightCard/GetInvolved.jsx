import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const GetInvolvedSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 overflow-hidden">
      {/* Background Blur Elements */}
      <div className="absolute -top-30 -left-30 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-30 -right-30 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl  backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-200 p-6 ">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl sm:text-1xl lg:text-3xl font-semibold text-blue-700 mb-2">
            Get Involved
          </h2>
          <p className="text-gray-700 text-base max-w-3xl leading-relaxed">
            Whether you want to collaborate, build something meaningful, or just
            talk tech—I’m always open to new ideas, challenges, and connections.
            Let’s create things that actually matter.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4 mb-4">
          {/* Card Item */}
          <div className="rounded-2xl  p-6 border border-blue-300">
            <h3 className="font-semibold text-blue-700 mb-2">Collaborate</h3>
            <p className="text-gray-700 text-sm  leading-relaxed">
              Open to working with developers, designers, and creators on
              real-world projects, startups, and experiments. If you’ve got an
              idea—I’m in.
            </p>
          </div>

          {/* Card Item */}
          <div className="rounded-2xl  p-6 border border-blue-300">
            <h3 className=" font-semibold text-blue-700 mb-2">Learn & Grow</h3>
            <p className="text-gray-700 text-sm  leading-relaxed">
              I love learning by building. If you’re into open-source, side
              projects, or skill-sharing—let’s grow together.
            </p>
          </div>

          {/* Card Item */}
          <div className="rounded-2xl  p-6 border border-blue-300">
            <h3 className=" font-semibold text-blue-700 mb-2">Share Ideas</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Got feedback, ideas, or just want to talk tech, startups, or the
              future? I’m always down for meaningful conversations.
            </p>
          </div>

          {/* Card Item */}
          <div className="rounded-2xl  p-6 border border-blue-300">
            <h3 className="font-semibold text-blue-700 mb-2">Build Impact</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              I’m especially interested in projects that solve real problems and
              create positive impact—tech with purpose.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer">
            Start a Conversation
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer">
            View My Work
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

export default GetInvolvedSection;
