import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, HeartHandshake } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/About";
import { useEffect, useState } from "react";
import API from "@/api/api";

export default function ContactPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [messageinfo, setMessageInfo] = useState([]);
  const handleSave = async () => {
    try {
      await API.post("/messages", { name, email, message });
      alert("Sent Message successfully");
    } catch (err) {
      alert("Failed to send", err);
    }
  };

  useEffect(() => {
    const getMessageInfo = async () => {
      try {
        const res = await API.get("/messages/messageinfo");
        setMessageInfo(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessageInfo();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 px-4 py-16 pt-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left – Emotional Message */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="rounded-2xl border-blue-200 shadow-lg">
                <CardContent className="p-8 space-y-4">
                  <HeartHandshake className="text-blue-700" size={36} />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    Why reach out?
                  </h2>
                  <p className="text-blue-800">
                    I believe strong democracy is built through dialogue and
                    connection. Whether you wish to share concerns, suggestions,
                    or ideas for national development — your voice is important.
                  </p>
                  <p className="text-blue-800">
                    I value direct communication with citizens and stakeholders.
                    Every message is given sincere attention, with respect and
                    responsibility.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="rounded-2xl border-blue-200 shadow-lg">
                <CardContent className="p-8 space-y-4">
                  {messageinfo.map((msg) => (
                    <div key={msg._id}>
                      <h3 className="text-xl font-semibold text-blue-900">
                        Other ways
                      </h3>
                      <div className="flex items-center gap-3 text-blue-800">
                        <Mail size={18} /> {msg.email}
                      </div>
                      <div className="flex items-center gap-3 text-blue-800">
                        <Phone size={18} /> {msg.contact}
                      </div>
                      <div className="flex items-center gap-3 text-blue-800">
                        <MapPin size={18} /> {msg.location}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Right – Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl border-blue-300 shadow-xl bg-white">
                <CardContent className="p-8 space-y-6">
                  <h2 className="text-2xl font-semibold text-blue-900">
                    Send a message
                  </h2>
                  <Input
                    required
                    placeholder="Your name"
                    className="rounded-xl"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    required
                    placeholder="Your email"
                    className="rounded-xl"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Textarea
                    required
                    placeholder="Tell me what’s on your mind..."
                    rows={5}
                    className="rounded-xl"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    className="w-full rounded-2xl bg-blue-700 hover:bg-blue-800"
                    onClick={handleSave}
                  >
                    <Send size={16} className="mr-2" /> Send Message
                  </Button>
                  <p className="text-xs text-blue-600 text-center">
                    Your message stays private. Always.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}
