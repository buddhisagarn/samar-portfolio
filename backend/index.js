import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";

// Routes
import authRoutes from "./Routes/auth.js";
import contentRoutes from "./Routes/content.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import aboutRoutes from "./Routes/about.js";
import bookRoutes from "./Routes/book.js";
import newsRoutes from "./Routes/news.js";
import eventsRoutes from "./Routes/events.js";
import subscribeRoutes from "./Routes/subscribe.js";
import AdminSubscriber from "./Routes/adminRoutes.js";

// Models
import Subscriber from "./Models/subscriber.js";

const app = express();
/* ================================
    CORS (Vercel-safe + frontend)
================================ */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://samar-portfolio-pearl.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// IMPORTANT: handle preflight
app.options("*", cors());

dotenv.config();

app.use(express.json());

/* ================================
    MongoDB (Serverless cached)
================================ */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
}

// ⬅ IMPORTANT: connect once at startup
await connectDB();

/* ================================
    Routes
================================ */
app.get("/check", (req, res) => {
  res.send("API running successfully on Check");
});
app.get("/", (req, res) => {
  res.send("API running successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api", subscribeRoutes);
app.use("/api/admin", AdminSubscriber);

/* ================================
    Admin APIs
================================ */
app.get("/api/admin/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({
      subscribedAt: -1,
    });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscribers" });
  }
});

/* ================================
    Email API (Gmail)
================================ */
app.post("/api/admin/send-email", async (req, res) => {
  try {
    const { subject, message } = req.body;

    const subscribers = await Subscriber.find();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    for (const sub of subscribers) {
      await transporter.sendMail({
        from: `"Portfolio" <${process.env.ADMIN_EMAIL}>`,
        to: sub.email,
        subject,
        html: `
          <h2>${subject}</h2>
          <p>${message}</p>
        `,
      });
    }

    res.json({ message: "Emails sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email sending failed" });
  }
});

/* ================================
    Export for Vercel
================================ */
export default app;
