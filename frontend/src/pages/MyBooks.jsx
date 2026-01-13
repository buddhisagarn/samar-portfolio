import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, ShoppingCart } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AboutSection from "@/components/About";
import NavBar from "@/components/NavBar";

const books = [
  {
    id: 1,
    title: "Building with Purpose",
    subtitle: "A Developer’s Guide to Meaningful Products",
    description:
      "This book is about thinking deeper before writing code — focusing on purpose, clarity, and long-term impact.",
    price: "$19",
    rating: 4.8,
    status: "Available",
    cover: "/book2.jpg",
    tags: ["Tech", "Mindset", "Startup"],
  },
  {
    id: 2,
    title: "The Quiet Builder",
    subtitle: "Growing Without Noise",
    description:
      "A reflective book for creators who prefer depth over hype and progress over attention.",
    price: "$15",
    rating: 4.6,
    status: "Coming Soon",
    cover: "/book1.jpg",
    tags: ["Life", "Growth"],
  },
];

export default function BookStorePage() {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 px-4 py-16 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
              My Books
            </h1>
            <p className="text-blue-700 mt-4 max-w-2xl mx-auto">
              Words I’ve written with intention — for builders, thinkers, and
              those who value depth.
            </p>
          </motion.div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="rounded-2xl shadow-xl border-blue-200 bg-white h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="rounded-xl mb-4 object-cover max-h-80"
                    />

                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-100 text-blue-700">
                        {book.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-blue-700 text-sm">
                        <Star size={14} /> {book.rating}
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-blue-900">
                      {book.title}
                    </h2>
                    <p className="text-sm text-blue-600 mb-2">
                      {book.subtitle}
                    </p>

                    <p className="text-blue-800 text-sm grow">
                      {book.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {book.tags.map((tag) => (
                        <Badge key={tag} className="bg-blue-50 text-blue-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-lg font-bold text-blue-900">
                        {book.price}
                      </span>

                      {book.status === "Available" ? (
                        <Button className="rounded-xl bg-blue-700 hover:bg-blue-800">
                          <ShoppingCart size={16} className="mr-1" /> Buy Now
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="rounded-xl border-blue-300 text-blue-700"
                        >
                          <BookOpen size={16} className="mr-1" /> Notify Me
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Author CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-semibold text-blue-900">
              Writing is my way of building.
            </h3>
            <p className="text-blue-700 mt-2">
              If these books resonate with you, I’d love to hear your thoughts.
            </p>
            <Button className="mt-6 rounded-2xl bg-blue-700 hover:bg-blue-800">
              Contact the Author
            </Button>
          </motion.div>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}
