import express from "express";
import dotenv from "dotenv";
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
import getInvolvedRoutes from "./Routes/getInvolved.js";
import aboutFooters from "./Routes/footer.js";

//config file
import { connectDB } from "./config/databaseConfig.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

dotenv.config();

// ⬅ IMPORTANT: connect once at startup
await connectDB();

/* ================================
    Routes
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api", subscribeRoutes);
app.use("/api/admin", AdminSubscriber);
app.use("/api/get-involved", getInvolvedRoutes);
app.use("/api/footer", aboutFooters);

/* ================================
    Export for Vercel
================================ */
const PORT = 5000;
app.listen(PORT, () => {
  console.log("APi is running");
});
export default app;
