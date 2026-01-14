import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import API from "../../api/api";

export default function AdminApp() {
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

  //  Fetch content from DB
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchContent = async () => {
      try {
        const res = await API.get("/api/content");
        setContent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isLoggedIn]);

  //  Save updates to DB
  const handleSave = async () => {
    try {
      await API.put("/content", content);
      alert("Content updated successfully ✅");
    } catch (err) {
      alert("Update failed ", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (loading) {
    return <div className="p-10 text-center">Loading content...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 grid md:grid-cols-2 gap-6">
      {/* Admin Panel */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Admin Dashboard
        </h2>

        {Object.keys(content).map((key) => (
          <div key={key} className="mb-3">
            <label className="block text-sm font-medium text-gray-600 capitalize">
              {key}
            </label>
            <input
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={content[key]}
              onChange={(e) =>
                setContent({ ...content, [key]: e.target.value })
              }
            />
          </div>
        ))}

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
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

      {/* Live Preview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
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
// login part
function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError("Invalid credentials", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-blue-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
        >
          Login
        </button>
      </motion.div>
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
