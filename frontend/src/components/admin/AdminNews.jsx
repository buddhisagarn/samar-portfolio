import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, TrendingUp } from "lucide-react";
import AdminSendEmail from "./AdminSendEmail.jsx";
import API from "@/api/api";
import { Calendar, Eye, Search } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [subscribers, setSubscribers] = useState([]);
  const [sendEmailOpen, setSendEmailOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    category: "",
    excerpt: "",
    trending: false,
  });

  /*  Load news */
  useEffect(() => {
    const newFunction = async () => {
      try {
        const res = await API.get("/news");
        setNews(res.data);
        const subscriber = await API.get("/admin/subscribers");
        setSubscribers(subscriber.data);
      } catch (err) {
        console.log(err);
      }
    };
    newFunction();
  }, []);

  /*  Handle form */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  /*  Add or  Update */
  const saveNews = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.excerpt.trim()) newErrors.excerpt = "Descriptions is required";
    if (!form.date.trim()) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let res;

      if (editingId) {
        res = await API.put(`/news/${editingId}`, form);
        setNews((prev) =>
          prev.map((n) => (n._id === editingId ? res.data : n)),
        );
      } else {
        res = await API.post("/news", form);
        setNews((prev) => [res.data, ...prev]);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  /*  Edit */
  const editNews = (n) => {
    setEditingId(n._id);
    setForm({
      title: n.title,
      date: n.date,
      category: n.category,
      excerpt: n.excerpt,
      trending: n.trending,
    });
  };

  /*  Delete */
  const deleteNews = async (id) => {
    await API.delete(`/news/${id}`);
    setNews(news.filter((n) => n._id !== id));
  };

  const deleteSubscriber = async (id) => {
    await API.delete(`/admin/subscribers/${id}`);
    setSubscribers(subscribers.filter((s) => s._id !== id));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      date: "",
      category: "",
      excerpt: "",
      trending: false,
    });
  };

  //Reading Article
  const getPreview = (text = "", limit = 200) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Add / Edit */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-900">
              {editingId ? "Edit News" : "Add News"}
            </h2>

            <div className="grid  gap-4">
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <Input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Date"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-600"
              >
                <option value="">Select Category</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <Textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              placeholder="Excerpt"
            />
            {errors.excerpt && (
              <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
            )}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="trending"
                checked={form.trending}
                onChange={handleChange}
              />
              <TrendingUp size={14} /> Trending
            </label>

            <Button onClick={saveNews} className="rounded-xl bg-blue-700">
              <Save size={16} className="mr-2" />
              {editingId ? "Update" : "Save"}
            </Button>
          </CardContent>
        </Card>

        {/* List */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 grid lg:grid-cols-2 gap-6">
            {news.map((n) => (
              <Card key={n._id} className="bg-white">
                <CardContent className="p-5 space-y-3">
                  <div className="flex justify-between">
                    <Badge>{n.category}</Badge>
                    {n.trending && <TrendingUp size={14} />}
                  </div>

                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-sm">{n.date}</p>
                  <p className="text-sm">{getPreview(n.excerpt, 50)}</p>

                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-xs">Views: {n.views}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedArticle(n)}
                      >
                        view More
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => editNews(n)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => deleteNews(n._id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
        {subscribers.length > 0 && (
          <Card className="rounded-2xl shadow-lg w-full">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-900">
                Subscribers
              </h2>

              <ul className="space-y-3">
                {subscribers.map((s) => (
                  <li
                    key={s._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border rounded-xl p-3"
                  >
                    {/* Email */}
                    <p className="text-sm text-gray-700 break-all">{s.email}</p>

                    {/* Actions */}
                    <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                      <Button
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => setSendEmailOpen(true)}
                      >
                        Send Email
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 w-full sm:w-auto"
                        onClick={() => deleteSubscriber(s._id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
      {sendEmailOpen && (
        <AdminSendEmail onClose={() => setSendEmailOpen(false)} />
      )}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-white w-[95%] max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-8 z-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <Badge className="bg-blue-100 text-blue-700 mb-3">
              {selectedArticle.category}
            </Badge>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {selectedArticle.title}
            </h2>

            <div className="text-sm text-blue-700 flex gap-6 mb-6">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {selectedArticle.date}
              </span>
              <span className="flex items-center gap-2">
                <Eye size={14} /> {selectedArticle.views}
              </span>
            </div>

            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {selectedArticle.excerpt}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
