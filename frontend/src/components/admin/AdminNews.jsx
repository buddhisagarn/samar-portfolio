import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, TrendingUp } from "lucide-react";
import NavBar from "./AdminNav";

const API = "http://localhost:5000/api/news";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    category: "",
    excerpt: "",
    trending: false,
  });

  /* 📥 Load news */
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setNews)
      .catch(console.error);
  }, []);

  /* 🔄 Handle form */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  /* ➕ Add or ✏️ Update */
  const saveNews = async () => {
    if (!form.title || !form.category) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setNews((prev) =>
      editingId
        ? prev.map((n) => (n._id === editingId ? data : n))
        : [data, ...prev],
    );

    resetForm();
  };

  /* ✏️ Edit */
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

  /* 🗑 Delete */
  const deleteNews = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
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

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <Input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Date"
              />
              <Input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
              />
            </div>

            <Textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              placeholder="Excerpt"
            />

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
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}
