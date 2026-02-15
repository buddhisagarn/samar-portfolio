import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "./UseAuth.jsx";
import { useNavigate } from "react-router-dom";
import API from "@/api/api.js";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      login(res.data.token);
      navigate("/admin-home");
    } catch (err) {
      setError("Invalid credentials ", err);
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

        <div className="flex border rounded-lg w-full mb-4 px-4 py-2 justify-between items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="flex-1 outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {showPassword ? (
            <EyeOff size={18} onClick={() => setShowPassword(false)} />
          ) : (
            <Eye size={18} onClick={() => setShowPassword(true)} />
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-700 text-white rounded-lg"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}
