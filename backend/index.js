import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://samar-portfolio-pearl.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running successfully");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

export default app;
