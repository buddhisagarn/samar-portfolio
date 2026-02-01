import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, ShoppingCart } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/About";

export default function BookStorePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

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
              Words I’ve written with intention — for builders & thinkers.
            </p>
          </motion.div>

          {/* Books */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <motion.div key={book._id} whileHover={{ scale: 1.03 }}>
                <Card className="rounded-2xl shadow-xl bg-white h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="rounded-xl mb-4 object-cover max-h-80"
                    />

                    <div className="flex justify-between mb-2">
                      <Badge>{book.status}</Badge>
                      <span className="flex items-center gap-1 text-sm">
                        <Star size={14} /> {book.rating}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <p className="text-sm text-blue-600">{book.subtitle}</p>

                    <p className="text-sm mt-2 grow">{book.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {book.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <span className="font-bold">{book.price}</span>

                      {book.status === "Available" ? (
                        <Button>
                          <ShoppingCart size={16} className="mr-1" />
                          Buy Now
                        </Button>
                      ) : (
                        <Button variant="outline">
                          <BookOpen size={16} className="mr-1" />
                          Notify Me
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AboutSection />
    </div>
  );
}
