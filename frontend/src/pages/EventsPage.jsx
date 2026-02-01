import { useEffect, useState } from "react";
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
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/About";
import axios from "axios";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH EVENTS ---------------- */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 px-4 py-12 pt-20">
        <div className="max-w-6xl mx-auto ">
          {/* Search */}
          <div className="flex items-center gap-2 max-w-md  mb-10 mt-5">
            <Search className="text-blue-600" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border-blue-300"
            />
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-blue-700">Loading events...</p>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div
                key={event._id}
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
                      {event.tags?.map((tag, i) => (
                        <Badge key={i} className="bg-blue-100 text-blue-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions (UI only for now) */}
                    <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                      <div className="flex items-center gap-4 text-blue-700 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart size={16} /> 0
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={16} /> 0
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

          {!loading && filteredEvents.length === 0 && (
            <p className="text-center text-blue-700 mt-10">No events found.</p>
          )}
        </div>
      </div>
      <AboutSection />
    </div>
  );
}
