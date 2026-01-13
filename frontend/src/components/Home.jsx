import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 text-gray-800 p-2 pt-15">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            🇳🇵 Nepalese Politician
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Giriraj Mani <span className="text-blue-700">Pokhrel</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            Former Minister & Constitutional Assembly Member. Dedicated to
            public service, democratic values, and national development.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-4">
            <StatBox value="15+" label="Years of Service" />
            <StatBox value="3" label="Ministerial Terms" />
            <StatBox value="Multiple" label="Leadership Roles" />
          </div>

          {/* CTA */}
          <div className="mt-10 flex gap-4">
            <button className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition">
              Learn More
            </button>
            <button className="px-6 py-3 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition">
              Get Involved
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <img
              src="/samarProfile.jpg"
              alt="Giriraj Mani Pokhrel"
              className="w-72 md:w-96 md:h-96 rounded-2xl shadow-xl object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 rounded-b-2xl">
              Giriraj Mani Pokhrel – Former Minister of Education, Science &
              Technology
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-wider rounded-full bg-blue-100 text-blue-700">
            EXPERIENCE & LEADERSHIP
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A Legacy of <span className="text-blue-700">Public Service</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From healthcare ministry to constitutional development, a
            distinguished career spanning multiple government formations and
            party leadership roles—dedicated to serving Nepal’s democratic
            progress.
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

