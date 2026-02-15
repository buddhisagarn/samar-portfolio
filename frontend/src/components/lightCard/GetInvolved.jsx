import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/api";

const GetInvolvedSection = ({ onClose }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/get-involved");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch Get Involved data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md">
        <p className="text-white text-lg">Loading...</p>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md animate-fadeIn  ">
      {/* Background Blur */}
      <div className="absolute -top-30 -left-30 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-30 -right-30 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full  backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-200 p-6 bg-white max-w-3xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-blue-700 mb-2">
            {data.heading}
          </h2>
          <p className="text-gray-700 text-base max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4 mb-4">
          {data.cards?.map((card, index) => (
            <div key={index} className="rounded-2xl p-6 border border-blue-300">
              <h3 className="font-semibold text-blue-700 mb-2">{card.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            onClick={() => navigate("/events")}
          >
            {data.ctaPrimary}
          </button>

          <button
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            onClick={() => navigate("/contact")}
          >
            {data.ctaSecondary}
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
