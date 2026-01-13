import React from "react";

const Footer = () => {
  return (
    <section className="bg-linear-to-br  from-blue-600 to-blue-700 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Political Journey & Party Leadership
        </h2>
        <p className="text-blue-200 max-w-2xl mx-auto mb-16">
          Giriraj Mani Pokharel's political career reflects Nepal's democratic
          evolution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <TimelineCard year="2007" title="First Ministerial Appointment" />
          <TimelineCard year="2009" title="Party Unification Leadership" />
          <TimelineCard year="Present" title="Senior Party Leadership" />
        </div>
      </div>
    </section>
  );
};

function TimelineCard({ year, title }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform duration-300">
      <span className="text-3xl font-bold text-blue-300">{year}</span>
      <h4 className="mt-4 text-lg font-semibold">{title}</h4>
    </div>
  );
}

export default Footer;
