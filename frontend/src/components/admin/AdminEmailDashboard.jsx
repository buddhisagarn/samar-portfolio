import API from "@/api/api";
import { useState } from "react";

const AdminEmailDashboard = () => {
  const [subs, setSubs] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSubs = async () => {
    const res = await API.get("admin/subscribers");
    const data = await res.json();
    setSubs(data);
  };

  const deleteSub = async (id) => {
    await API.delete(`admin/subscribers/${id}`, {
      method: "DELETE",
    });
    fetchSubs();
  };

  const sendEmail = async () => {
    setLoading(true);
    setStatus("");

    const res = await API.post("admin/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message }),
    });

    const data = await res.json();
    setStatus(data.message);
    setLoading(false);
    setSubject("");
    setMessage("");
  };

  const filtered = subs.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700">
        Admin Email Dashboard
      </h1>

      {/* Stats */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <p className="text-lg">
          Total Subscribers:
          <span className="ml-2 font-semibold text-blue-600">
            {subs.length}
          </span>
        </p>
      </div>

      {/* Email Sender */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-blue-600">Send Newsletter</h2>

        <input
          placeholder="Email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-3 w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-3 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={sendEmail}
          disabled={loading}
          className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send to All"}
        </button>

        {status && <p className="mt-2 text-green-600">{status}</p>}
      </div>

      {/* Subscriber List */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <div className="mb-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-600">Subscribers</h2>

          <input
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border px-3 py-1 text-sm outline-none"
          />
        </div>

        <ul className="max-h-64 overflow-y-auto text-sm">
          {filtered.map((s) => (
            <li
              key={s._id}
              className="flex items-center justify-between border-b py-2"
            >
              <span>{s.email}</span>
              <button
                onClick={() => deleteSub(s._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminEmailDashboard;
