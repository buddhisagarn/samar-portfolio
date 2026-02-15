import { useEffect, useState } from "react";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { AutoGrowTextarea } from "./Admin.jsx";

export default function AdminFooter() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio1: "",
    bio2: "",
    vision: "",
    highlights: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/footer");
        setForm({
          ...res.data,
          highlights: res.data.highlights.join(","),
        });
      } catch (err) {
        console.error("Failed to load about data", err);
      }
    };
    fetchData();
  }, []);

  const submit = async () => {
    await API.put(
      "/footer",
      {
        ...form,
        highlights: form.highlights.split(","),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    alert("Updated!");
  };

  return (
    <div className="p-6 space-y-4 flex flex-col">
      <label htmlFor="name" className="font-bold text-blue-900">
        Title
      </label>
      <AutoGrowTextarea
        className="bg-gray-200 p-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <label htmlFor="name" className="font-bold text-blue-900">
        Role
      </label>
      <AutoGrowTextarea
        className="bg-gray-200 p-2"
        placeholder="Role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
      <label htmlFor="name" className="font-bold text-blue-900">
        BIO-1
      </label>
      <AutoGrowTextarea
        className="bg-gray-200 p-2"
        placeholder="Bio 1"
        value={form.bio1}
        onChange={(e) => setForm({ ...form, bio1: e.target.value })}
      />
      <label htmlFor="name" className="font-bold text-blue-900">
        BIO-2
      </label>
      <AutoGrowTextarea
        className="bg-gray-200 p-2 h-fit"
        placeholder="Bio 2"
        value={form.bio2}
        onChange={(e) => setForm({ ...form, bio2: e.target.value })}
      />
      <label htmlFor="name" className="font-bold text-blue-900">
        Vision
      </label>
      <AutoGrowTextarea
        className="bg-gray-200 p-2"
        placeholder="Vision"
        value={form.vision}
        onChange={(e) => setForm({ ...form, vision: e.target.value })}
      />
      <label htmlFor="name" className="font-bold text-blue-900">
        Quick Snap
      </label>
      <AutoGrowTextarea
        className="bg-gray-200 p-2 h-fit"
        placeholder="Highlights (comma separated)"
        value={form.highlights}
        onChange={(e) => setForm({ ...form, highlights: e.target.value })}
      />
      <Button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 w-fit cursor-pointer"
      >
        Save Changes
      </Button>
    </div>
  );
}
