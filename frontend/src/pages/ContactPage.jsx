import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, HeartHandshake } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/About";

export default function ContactPage() {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 px-4 py-16 pt-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
              Let’s Talk 🤝
            </h1>
            <p className="text-blue-700 mt-4 max-w-2xl mx-auto">
              If something here resonated with you — an idea, a project, or just
              a thought — I’d genuinely love to hear from you.
            </p>
          </motion.div>

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
                    I believe meaningful things start with conversations.
                    Whether you want to collaborate, ask something, share
                    feedback, or just say hello — your message matters.
                  </p>
                  <p className="text-blue-800">
                    I read every message personally and reply with intention. No
                    bots. No rush. Just real talk.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="rounded-2xl border-blue-200 shadow-lg">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-blue-900">
                    Other ways
                  </h3>
                  <div className="flex items-center gap-3 text-blue-800">
                    <Mail size={18} /> youremail@example.com
                  </div>
                  <div className="flex items-center gap-3 text-blue-800">
                    <Phone size={18} /> +977-XXXXXXXX
                  </div>
                  <div className="flex items-center gap-3 text-blue-800">
                    <MapPin size={18} /> Nepal (Remote-friendly)
                  </div>
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

                  <Input placeholder="Your name" className="rounded-xl" />
                  <Input placeholder="Your email" className="rounded-xl" />
                  <Textarea
                    placeholder="Tell me what’s on your mind..."
                    rows={5}
                    className="rounded-xl"
                  />

                  <Button className="w-full rounded-2xl bg-blue-700 hover:bg-blue-800">
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
