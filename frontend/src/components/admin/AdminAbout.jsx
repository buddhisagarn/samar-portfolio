import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import API from "@/api/api";

export default function AdminAbout() {
  const [form, setForm] = useState({
    title: "",
    about: "",
    description: "",
    pictitle: "",
  });

  const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [aboutId, setAboutId] = useState(null); // Store the about section ID for skill deletion

  /* -------------------- LOAD DATA -------------------- */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get("/about");
        if (res.data) {
          setForm({
            title: res.data.title || "",
            about: res.data.about || "",
            description: res.data.description || "",
            pictitle: res.data.pictitle || "",
          });
          setSkills(res.data.skill || []);
          setAboutId(res.data._id); // Store the about section ID
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAbout();
  }, []);

  /* -------------------- FORM HANDLERS -------------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    setSkills([...skills, { title: "", about: "" }]);
  };

  const updateSkill = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  // const deleteSkill = (index) => {
  //   console.log("Deleting skill with id:", index);
  //   API.delete(`/about/${index}`).catch((err) => console.error(err));
  //   setSkills(skills.filter((_, i) => i !== index));
  // };
  const deleteSkill = async (id) => {
    if (!confirm("Sure to delete this skill")) return;
    try {
      console.log("Deleted skill with id:", id);
      await API.delete(`/about/${aboutId}/skill/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------- SAVE -------------------- */
  const saveAbout = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("about", form.about);
      formData.append("description", form.description);
      formData.append("pictitle", form.pictitle);
      formData.append("skills", JSON.stringify(skills));

      if (image) {
        formData.append("image", image);
      }

      await API.post("/about", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("About page saved successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed ");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* ABOUT SECTION */}
        <Card className="rounded-2xl border-blue-200 shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-900">
              About Section
            </h2>

            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Main title"
            />

            <Textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={3}
              placeholder="Short about text"
            />

            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed description"
            />

            <Input
              name="pictitle"
              value={form.pictitle}
              onChange={handleChange}
              placeholder="Profile image title"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="block w-full text-sm text-gray-600"
            />
            {preview && (
              <img
                src={preview}
                className="w-40 h-40 object-cover rounded-xl mt-3"
                alt="Preview"
              />
            )}
          </CardContent>
        </Card>

        {/* SKILLS SECTION */}
        <Card className="rounded-2xl border-blue-200 shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-blue-900">
                Skills / Values
              </h2>
              <Button
                size="sm"
                onClick={addSkill}
                className="bg-blue-700 hover:bg-blue-800 rounded-xl"
              >
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={index}
                  className="rounded-2xl border-blue-100 bg-white"
                >
                  <CardContent className="p-5 space-y-3">
                    <Input
                      value={skill.title}
                      onChange={(e) =>
                        updateSkill(index, "title", e.target.value)
                      }
                      placeholder="Skill title"
                    />
                    <Textarea
                      value={skill.about}
                      onChange={(e) =>
                        updateSkill(index, "about", e.target.value)
                      }
                      placeholder="Skill description"
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSkill(skill._id)}
                        className="border-red-300 text-red-600"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={saveAbout}
              className="bg-blue-700 hover:bg-blue-800 rounded-xl"
            >
              <Save size={16} className="mr-2" /> Save About Page
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
