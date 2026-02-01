"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, Save } from "lucide-react";
import NavBar from "./AdminNav";

const API = "http://localhost:5000/api/events";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    tags: "",
  });

  /* 📥 Load events */
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ➕ Add / ✏️ Update */
  const saveEvent = async () => {
    if (!form.title) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setEvents((prev) =>
      editingId
        ? prev.map((e) => (e._id === editingId ? data : e))
        : [data, ...prev],
    );

    resetForm();
  };

  /* ✏️ Edit */
  const editEvent = (event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      tags: event.tags.join(", "),
    });
  };

  /* 🗑 Delete */
  const deleteEvent = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setEvents(events.filter((e) => e._id !== id));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      date: "",
      location: "",
      description: "",
      tags: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        {/* Add / Edit Form */}
        <Card className="rounded-2xl border-blue-200 mb-10">
          <CardContent className="p-6 grid md:grid-cols-2 gap-4">
            <Input
              name="title"
              placeholder="Event title"
              value={form.title}
              onChange={handleChange}
            />
            <Input
              name="date"
              placeholder="Date"
              value={form.date}
              onChange={handleChange}
            />
            <Input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            <Input
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
            />
            <Input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="md:col-span-2"
            />

            <Button
              onClick={saveEvent}
              className="bg-blue-700 hover:bg-blue-800 rounded-xl md:col-span-2"
            >
              {editingId ? (
                <Save size={16} className="mr-2" />
              ) : (
                <Plus size={16} className="mr-2" />
              )}
              {editingId ? "Update Event" : "Add Event"}
            </Button>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="rounded-2xl bg-white">
              <CardContent className="p-5 space-y-3">
                <h2 className="font-semibold text-blue-900">{event.title}</h2>
                <p className="text-sm text-blue-700">
                  {event.date} · {event.location}
                </p>
                <p className="text-sm">{event.description}</p>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((t) => (
                    <Badge key={t} className="bg-blue-100 text-blue-700">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editEvent(event)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-600"
                    onClick={() => deleteEvent(event._id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
