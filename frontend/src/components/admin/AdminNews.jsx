import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, TrendingUp } from "lucide-react";
import AdminSendEmail from "./AdminSendEmail.jsx";
import API from "@/api/api";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [subscribers, setSubscribers] = useState([]);
  const [sendEmailOpen, setSendEmailOpen] = useState(false);
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
                  <p className="text-sm">{n.excerpt}</p>

                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-xs">Views: {n.views}</span>
                    <div className="flex gap-2">
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
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-blue-900">
                Subscribers
              </h2>
              <ul className="list-disc list-inside">
                {subscribers.map((s) => (
                  <li
                    key={s._id}
                    className="text-sm text-gray-700 flex justify-between "
                  >
                    {s.email}
                    <Button
                      className="mt-1"
                      onClick={async () => {
                        setSendEmailOpen(true);
                      }}
                    >
                      Send Email
                    </Button>
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
    </div>
  );
}
