import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const categories = ["All", "Technology", "Career", "Business"];

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* 📥 Fetch news from backend */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/news");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /*  Increase views */
  const handleRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/news/${id}/view`, {
        method: "PATCH",
      });

      // update UI instantly (no refetch)
      setNews((prev) =>
        prev.map((n) => (n._id === id ? { ...n, views: n.views + 1 } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  /*  Filters */
  const filteredNews = news.filter((item) => {
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
          {/* Search + Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-2 w-full md:max-w-md mt-5">
              <Search className="text-blue-600" />
              <Input
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border-blue-300"
              />
            </div>

            <Tabs defaultValue="All" onValueChange={setActiveCategory}>
              <TabsList className="bg-blue-100 rounded-xl">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-blue-700">Loading news...</p>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((n) => (
              <motion.div key={n._id} whileHover={{ scale: 1.02 }}>
                <Card className="rounded-2xl shadow-lg border border-blue-200 bg-white">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-700">
                        {n.category}
                      </Badge>

                      {n.trending && (
                        <span className="flex items-center gap-1 text-blue-600 text-sm">
                          <TrendingUp size={14} /> Trending
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-blue-900">
                      {n.title}
                    </h2>

                    <p className="text-blue-800 text-sm">{n.excerpt}</p>

                    <div className="flex justify-between text-sm text-blue-700 pt-4 border-t">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} /> {n.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Eye size={14} /> {n.views}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-blue-300 text-blue-700"
                      onClick={() => {
                        handleRead(n._id); // increase views
                        navigate(`/articles/${n._id}`); // go to read page
                      }}
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
