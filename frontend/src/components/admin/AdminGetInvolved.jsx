import { useEffect, useState } from "react";
import API from "@/api/api";

export default function AdminGetInvolved() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/get-involved").then((res) => setData(res.data));
  }, []);

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleCardChange = (index, key, value) => {
    const cards = [...data.cards];
    cards[index][key] = value;
    setData({ ...data, cards });
  };

  const saveContent = async () => {
    await API.put("/get-involved", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Content updated successfully");
  };

  if (!data) return <p className="p-6 text-center text-blue-700">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Heading */}
      <input
        value={data.heading}
        onChange={(e) => handleChange("heading", e.target.value)}
        className="w-full p-3 border rounded-xl mb-4 font-bold text-blue-700"
        placeholder="Heading"
      />

      <textarea
        value={data.description}
        onChange={(e) => handleChange("description", e.target.value)}
        className="w-full p-3 border rounded-xl mb-6"
        rows={4}
        placeholder="Description"
      />

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.cards.map((card, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <input
              value={card.title}
              onChange={(e) => handleCardChange(i, "title", e.target.value)}
              className="w-full mb-2 p-2 border rounded font-bold text-blue-700"
            />
            <textarea
              value={card.description}
              onChange={(e) =>
                handleCardChange(i, "description", e.target.value)
              }
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className=" mt-6 ">
        <h1 className="mb-2 font-bold text-red-700">Buttons</h1>

        <div className="flex gap-4">
          <input
            value={data.ctaPrimary}
            onChange={(e) => handleChange("ctaPrimary", e.target.value)}
            className="p-3 border rounded-xl w-full"
            placeholder="Primary CTA"
          />
          <input
            value={data.ctaSecondary}
            onChange={(e) => handleChange("ctaSecondary", e.target.value)}
            className="p-3 border rounded-xl w-full"
            placeholder="Secondary CTA"
          />
        </div>
      </div>

      <button
        onClick={saveContent}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
