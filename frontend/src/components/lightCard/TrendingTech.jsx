const TrendingTechnology = () => {
  const articles = [
    {
      title: "Artificial Intelligence (AI)",
      desc: "AI is transforming industries through automation, data analysis, and intelligent decision-making.",
    },
    {
      title: "Blockchain & Web3",
      desc: "Decentralized technologies are reshaping finance, security, and digital ownership.",
    },
    {
      title: "Cloud Computing",
      desc: "Cloud platforms enable scalable, cost-efficient infrastructure for modern applications.",
    },
    {
      title: "Cybersecurity",
      desc: "With rising cyber threats, security technologies are more critical than ever.",
    },
    {
      title: "Internet of Things (IoT)",
      desc: "Connected devices are enabling smart homes, cities, and industries.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 text-white px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Trending Technologies 
        </h1>
        <p className="text-blue-200 text-lg md:text-xl">
          Exploring the technologies shaping the future of the digital world
        </p>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item, index) => (
          <div
            key={index}
            className="bg-blue-950/60 backdrop-blur rounded-xl p-6 
            hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-3 text-blue-300">
              {item.title}
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-blue-300 text-sm">
        © 2026 | Technology Article Page
      </div>
    </div>
  );
};

export default TrendingTechnology;
