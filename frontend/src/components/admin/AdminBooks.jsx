import { useEffect, useState } from "react";
import API from "../../api/api.js"; // your api.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
export default function AdminBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
    rating: "",
    status: "Available",
    cover: "",
    tags: "",
  });

  // -----------------------------
  // Fetch books
  // -----------------------------
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // -----------------------------
  // Form handlers
  // -----------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      subtitle: "",
      description: "",
      price: "",
      rating: "",
      status: "Available",
      cover: "",
      tags: "",
    });
    setEditingId(null);
  };

  // -----------------------------
  // Create / Update
  // -----------------------------
  const handleSubmit = async () => {
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    try {
      if (editingId) {
        await API.put(`/books/${editingId}`, payload);
      } else {
        await API.post("/books", payload);
      }
      resetForm();
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // Edit
  // -----------------------------
  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm({
      title: book.title,
      subtitle: book.subtitle,
      description: book.description,
      price: book.price,
      rating: book.rating,
      status: book.status,
      cover: book.cover,
      tags: book.tags.join(", "),
    });
  };

  // -----------------------------
  // Delete
  // -----------------------------
  const handleDelete = async (id) => {
    if (!confirm("Delete this book?")) return;
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* ---------------- FORM ---------------- */}
        <Card className="lg:col-span-1 border-blue-200 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-900">
              {editingId ? "Edit Book" : "Add New Book"}
            </h2>

            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
            <Input
              name="subtitle"
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={handleChange}
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <Input
              name="price"
              placeholder="Price ($)"
              value={form.price}
              onChange={handleChange}
            />
            <Input
              name="rating"
              placeholder="Rating"
              value={form.rating}
              onChange={handleChange}
            />
            <Input
              name="cover"
              placeholder="Cover image URL"
              value={form.cover}
              onChange={handleChange}
            />
            <Input
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2"
            >
              <option>Available</option>
              <option>Coming Soon</option>
            </select>

            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                className="bg-blue-700 hover:bg-blue-800 w-full"
              >
                {editingId ? "Update" : "Create"}
              </Button>
              {editingId && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ---------------- LIST ---------------- */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-blue-700">Loading...</p>
          ) : (
            books.map((book) => (
              <motion.div key={book._id} whileHover={{ scale: 1.02 }}>
                <Card className="border-blue-200 shadow-lg">
                  <CardContent className="p-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="rounded-xl h-48 w-full object-cover mb-3"
                    />

                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-blue-100 text-blue-700">
                        {book.status}
                      </Badge>
                      <span className="text-sm text-blue-700">
                        ⭐ {book.rating}
                      </span>
                    </div>

                    <h3 className="font-semibold text-blue-900">
                      {book.title}
                    </h3>
                    <p className="text-sm text-blue-600">{book.subtitle}</p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {book.tags.map((tag) => (
                        <Badge key={tag} className="bg-blue-50 text-blue-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between mt-4">
                      <Button size="sm" onClick={() => handleEdit(book)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
