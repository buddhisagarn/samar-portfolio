import React from "react";

const Footer = () => {
  return (
    <section className="bg-linear-to-br  from-blue-600 to-blue-700 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Political Journey & Leadership
        </h2>
        <p className="text-blue-200 max-w-2xl mx-auto mb-16">
          My political journey is grounded in public service, grassroots
          connection, and a strong commitment to the people. I believe true
          leadership is built on integrity, accountability, and inclusive
          development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <TimelineCard year="2007" title="Foundation and Learning" />
          <TimelineCard
            year="2009"
            title="Engagement and Public Responsibility"
          />
          <TimelineCard
            year="Present"
            title="Leadership and political commitment"
          />
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
