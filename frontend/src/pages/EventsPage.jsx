import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Search,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AboutPage from "./AboutPage";
import AboutSection from "@/components/About";
import NavBar from "@/components/NavBar";

const initialEvents = [
  {
    id: 1,
    title: "Tech Meetup 2026",
    date: "March 20, 2026",
    location: "Kathmandu, Nepal",
    description:
      "A community-driven meetup to discuss modern web, AI, and startups.",
    tags: ["Tech", "AI", "Startup"],
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    title: "Personal Brand Workshop",
    date: "April 5, 2026",
    location: "Online (Zoom)",
    description:
      "Learn how to build a strong personal brand as a developer or creator.",
    tags: ["Branding", "Career"],
    likes: 21,
    comments: 6,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");

  const likeEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, likes: e.likes + 1 } : e))
    );
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 px-4 py-12 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-blue-900">
              Events & Activities
            </h1>
            <p className="text-blue-700 mt-2">
              Things I host, attend, and care about
            </p>
          </motion.div>

          {/* Search */}
          <div className="flex items-center gap-2 max-w-md mx-auto mb-10">
            <Search className="text-blue-600" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border-blue-300"
            />
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="rounded-2xl shadow-lg border border-blue-200 bg-white">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-blue-900">
                      {event.title}
                    </h2>

                    <div className="text-sm text-blue-700 flex items-center gap-2">
                      <Calendar size={16} /> {event.date}
                    </div>

                    <div className="text-sm text-blue-700 flex items-center gap-2">
                      <MapPin size={16} /> {event.location}
                    </div>

                    <p className="text-blue-800 text-sm">{event.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge key={tag} className="bg-blue-100 text-blue-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                      <div className="flex items-center gap-4 text-blue-700 text-sm">
                        <button
                          onClick={() => likeEvent(event.id)}
                          className="flex items-center gap-1 hover:text-blue-900"
                        >
                          <Heart size={16} /> {event.likes}
                        </button>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={16} /> {event.comments}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="rounded-xl border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Share2 size={16} className="mr-1" /> Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold text-blue-900">
              Want to collaborate or attend?
            </h3>
            <p className="text-blue-700 mt-2">
              Reach out and let's build something meaningful together.
            </p>
            <Button className="mt-6 rounded-2xl bg-blue-700 hover:bg-blue-800">
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}
