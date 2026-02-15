import API from "@/api/api";
import { useState } from "react";
import { ImCross } from "react-icons/im";

const AdminSendEmail = ({ onClose }) => {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.subject || !form.message) {
      return setResponseMsg("All fields are required.");
    }

    try {
      setLoading(true);
      setResponseMsg("");

      const res = await API.post("/admin/send-email", form);

      setResponseMsg(res.data.message);
      setForm({ subject: "", message: "" });
    } catch (err) {
      setResponseMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className=" relative w-full max-w-xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8 border border-blue-200">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6">
          Send Email to Subscribers
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 ">
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter email subject"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write your email message..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>

          {/* Response */}
          {responseMsg && (
            <p className="text-center text-sm mt-3 text-blue-600">
              {responseMsg}
            </p>
          )}
        </form>
        <button
          className="absolute top-1 right-1  p-2 cursor-pointer"
          onClick={onClose}
        >
          <ImCross />
        </button>
      </div>
    </section>
  );
};

export default AdminSendEmail;
