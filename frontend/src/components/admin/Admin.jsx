import { useEffect, useState } from "react";
import API from "../../api/api";
import AdminLogin from "./AdminLogin";

export default function AdminHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState({
    name: "",
    title: "",
    description: "",
    years: "",
    terms: "",
    roles: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ---------------- FETCH CONTENT ---------------- */
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchContent = async () => {
      try {
        const res = await API.get("/content");
        setContent(res.data);
        if (res.data?.image) {
          setPreview(res.data.image);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isLoggedIn]);

  /* ---------------- SAVE (WITH IMAGE) ---------------- */
  const handleSave = async () => {
    try {
      const formData = new FormData();

      Object.keys(content).forEach((key) => {
        formData.append(key, content[key]);
      });

      if (image) {
        formData.append("image", image); //  MUST MATCH BACKEND
      }

      await API.patch("/content", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Content updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  if (loading) {
    return <div className="p-10 text-center">Loading content...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {/* ADMIN PANEL */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {Object.keys(content).map((key) => (
          <div key={key} className="mb-3">
            <label className="block text-sm font-medium text-gray-600 capitalize">
              {key}
            </label>
            <input
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none overflow-scroll"
              value={content[key]}
              onChange={(e) =>
                setContent({ ...content, [key]: e.target.value })
              }
            />
          </div>
        ))}

        {/* IMAGE INPUT */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="mt-1"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg"
          >
            Save Changes
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* LIVE PREVIEW */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded-full mb-4 border"
          />
        )}

        <span className="inline-block mb-3 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
          🇳🇵 Nepalese Politician
        </span>

        <h1 className="text-3xl font-extrabold">
          {content.name.split(" ")[0]}{" "}
          <span className="text-blue-700">
            {content.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="mt-3 text-gray-600">{content.title}</p>
        <p className="mt-2 text-gray-500">{content.description}</p>

        <div className="mt-6 flex gap-4">
          <Stat value={content.years} label="Years of Service" />
          <Stat value={content.terms} label="Ministerial Terms" />
          <Stat value={content.roles} label="Leadership Roles" />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-blue-50 px-4 py-3 rounded-xl text-center">
      <div className="text-xl font-bold text-blue-700">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}
