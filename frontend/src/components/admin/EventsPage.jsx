"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, Save } from "lucide-react";
import { AutoGrowTextarea } from "./Admin.jsx";
import API from "@/api/api";
import { Textarea } from "../ui/textarea.jsx";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    tags: "",
  });

  //
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

  /*  Load events */
  useEffect(() => {
    const setEvent = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    setEvent();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*  Add /  Update */
  const saveEvent = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.date.trim()) newErrors.date = "Date is required";
    if (!form.tags.trim()) newErrors.tags = "Tags are required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let res;

      if (editingId) {
        // Update existing item
        res = await API.put(`/events/${editingId}`, form);
      } else {
        // Create new item
        res = await API.post("/events", form);
      }

      const data = res.data; // Axios already gives parsed JSON here

      alert(data.message || "Success!");

      setEvents((prev) =>
        editingId
          ? prev.map((e) => (e._id === editingId ? data : e))
          : [data, ...prev],
      );

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /*  Edit */
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
    await API.delete(`/events/${id}`);

    setEvents(events.filter((e) => e._id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        {/* Add / Edit Form */}
        <Card className="rounded-2xl border-blue-200 mb-10">
          <CardContent className="p-6 flex flex-col gap-4">
            <Input
              name="title"
              placeholder="Event title"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title}</p>
            )}
            <Input
              name="date"
              placeholder="Date"
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date}</p>
            )}
            <Input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location}</p>
            )}
            <Input
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
            />
            {errors.tags && (
              <p className="text-sm text-red-600">{errors.tags}</p>
            )}
            <Textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="md:col-span-2 h-30"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
            <Button
              onClick={saveEvent}
              className="bg-blue-700 hover:bg-blue-800 rounded-xl md:col-span-2 w-fit"
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
