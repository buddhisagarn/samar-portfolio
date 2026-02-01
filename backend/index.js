import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import contentRoutes from "./Routes/content.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import aboutRoutes from "./Routes/about.js";
import bookRoutes from "./Routes/book.js";
import newsRoutes from "./Routes/news.js";
import eventsRoutes from "./Routes/events.js";

dotenv.config();
const app = express();

//  Manual CORS (Vercel-safe)
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://samar-portfolio-pearl.vercel.app",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

// ---- MongoDB connection (serverless-safe) ----
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

app.get("/", (req, res) => {
  res.send("API running successfully");
});
app.use("/api/messages", messageRoutes);

app.use("/api/about", aboutRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/news", newsRoutes);

app.use("/api/events", eventsRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
