import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Eye, Search, TrendingUp } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/About";

const newsData = [
  {
    id: 1,
    title: "AI Is Reshaping Web Development in 2026",
    date: "Jan 12, 2026",
    category: "Technology",
    excerpt:
      "From AI-assisted coding to autonomous testing, web development is entering a new era.",
    views: 1240,
    trending: true,
  },
  {
    id: 2,
    title: "Why Personal Branding Matters More Than Ever",
    date: "Jan 10, 2026",
    category: "Career",
    excerpt:
      "Developers and creators who invest in personal branding are seeing massive long-term benefits.",
    views: 860,
    trending: false,
  },
  {
    id: 3,
    title: "Remote Work: The New Normal for Tech Teams",
    date: "Jan 8, 2026",
    category: "Business",
    excerpt:
      "Companies are rethinking office culture as remote-first teams outperform expectations.",
    views: 990,
    trending: true,
  },
];

const categories = ["All", "Technology", "Career", "Business"];

export default function NewsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews = newsData.filter((item) => {
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 px-4 py-12 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-blue-900">Latest News</h1>
            <p className="text-blue-700 mt-2">
              Insights, updates, and thoughts worth sharing
            </p>
          </motion.div>

          {/* Search + Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-2 w-full md:max-w-md">
              <Search className="text-blue-600" />
              <Input
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border-blue-300 border "
              />
            </div>

            <Tabs
              defaultValue="All"
              onValueChange={(val) => setActiveCategory(val)}
            >
              <TabsList className="bg-blue-100 rounded-xl">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="rounded-xl">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <motion.div
                key={news.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="rounded-2xl shadow-lg border border-blue-200 bg-white">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-700">
                        {news.category}
                      </Badge>
                      {news.trending && (
                        <div className="flex items-center gap-1 text-blue-600 text-sm">
                          <TrendingUp size={14} /> Trending
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-blue-900">
                      {news.title}
                    </h2>

                    <p className="text-blue-800 text-sm">{news.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-blue-700 pt-4 border-t border-blue-100">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} /> {news.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={14} /> {news.views}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      Read Full Article
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold text-blue-900">
              Want more insights?
            </h3>
            <p className="text-blue-700 mt-2">
              Subscribe or follow me for regular updates.
            </p>
            <Button className="mt-6 rounded-2xl bg-blue-700 hover:bg-blue-800">
              Subscribe
            </Button>
          </motion.div>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}
