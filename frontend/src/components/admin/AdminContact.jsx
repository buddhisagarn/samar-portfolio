import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Trash2, Save } from "lucide-react";
import API from "@/api/api";

export default function AdminContact() {
  const [data, setData] = useState(null);
  API.get("/messages/messageinfo").then((res) => setData(res.data[0]));

  const [contactInfo, setContactInfo] = useState({
    email: "",
    contact: "",
    location: "",
  });

  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((m) => m.id !== id));
  };
  // useEffect
  useEffect(() => {
    const handleMessage = async () => {
      try {
        const res = await API.get("/messages"); // admin protected
        setMessages(res.data); //  THIS is the array
        const resmsginfo = await API.get("/messages/messageinfo");
        const info = resmsginfo.data[0];

        setContactInfo({
          email: info.email || "",
          contact: info.contact || info.phone || "",
          location: info.location || "",
        });
      } catch (err) {
        console.log(err);
      }
    };
    handleMessage();
  }, []);

  if (!data) {
    return <p className="p-6 text-center text-blue-700">Loading...</p>;
  }

  //Saving the data in db
  const saveContactInfo = async () => {
    try {
      await API.put("/messages/messageinfo", contactInfo);
      alert("Contact info saved ");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* <h1 className="text-3xl font-bold text-blue-900">
            Admin · Contact Page
          </h1> */}

        {/* Contact Info Settings */}
        <Card className="rounded-2xl border-blue-200 shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-900">
              Contact Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="text-blue-700" size={18} />
                <Input
                  name="email"
                  value={contactInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-blue-700" size={18} />
                <Input
                  name="contact"
                  value={contactInfo.contact}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-700" size={18} />
                <Input
                  name="location"
                  value={contactInfo.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button
              className="mt-4 rounded-xl bg-blue-700 hover:bg-blue-800"
              onClick={saveContactInfo}
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="rounded-2xl border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Messages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((msg) => (
                <Card
                  key={msg._id}
                  className="rounded-2xl border-blue-100 bg-white"
                >
                  <CardContent
                    className="relative m-3 rounded-xl bg-linear-to-br 
                          from-blue-100 to-blue-200 p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-blue-900">
                          {msg.name}
                        </h3>
                        <p className="text-xs text-blue-700">{msg.email}</p>
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteMessage(msg.id)}
                        className="text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    {/* Message box */}
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">
                        Message
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
