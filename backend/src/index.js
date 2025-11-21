// backend/src/index.js
import express from "express";
import cors from "cors";
import skillGapRouter from "./routes/skillGap.js";
import roadmapRouter from "./routes/roadmap.js";
import newsRouter from "./routes/news.js"; 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Career Planner API is running" });
});

// IMPORTANT: base paths for routes
app.use("/api/skill-gap", skillGapRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/news", newsRouter);

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
