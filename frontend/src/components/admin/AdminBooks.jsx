import { useEffect, useState } from "react";
import API from "../../api/api.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoMdStar } from "react-icons/io";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function AdminBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    rating: "",
    status: "Read",
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
  // Form Handlers
  // -----------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      subtitle: "",
      description: "",
      rating: "",
      status: "Read",
      tags: "",
    });
    setImage(null);
    setPreview("");
    setEditingId(null);
    setErrors({});
  };

  // -----------------------------
  // Create / Update
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.rating) newErrors.rating = "Rating is required";
    if (!form.tags.trim()) newErrors.tags = "At least one tag is required";
    if (!form.status) newErrors.status = "Status is required";

    if (!editingId && !image) newErrors.cover = "Cover image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("description", form.description);
      formData.append("rating", form.rating);
      formData.append("status", form.status);
      formData.append("tags", form.tags);

      if (image) {
        formData.append("book", image);
      }

      if (editingId) {
        await API.put(`/books/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const res = await API.post("/books", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert(res.data.message);
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
      rating: book.rating,
      status: book.status,
      tags: book.tags.join(", "),
    });
    setPreview(book.cover);
    setImage(null);
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* FORM */}
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
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}

            <Input
              name="subtitle"
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={handleChange}
            />
            {errors.subtitle && (
              <p className="text-red-500 text-sm">{errors.subtitle}</p>
            )}

            <Textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}

            <Input
              name="rating"
              placeholder="Rating"
              value={form.rating}
              onChange={handleChange}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}

            <Input
              name="cover"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.cover && (
              <p className="text-red-500 text-sm">{errors.cover}</p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-32 h-40 object-cover rounded shadow"
              />
            )}

            <Input
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2"
            >
              <option>Read</option>
              <option>Currently Reading</option>
              <option>Want to Read</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                className="bg-blue-700 hover:bg-blue-800"
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

        {/* LIST */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
          {loading ? (
            <p>Loading...</p>
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
                      <span className="text-sm text-blue-700 flex items-center gap-1">
                        <IoMdStar className="text-red-500" />
                        {book.rating}
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
