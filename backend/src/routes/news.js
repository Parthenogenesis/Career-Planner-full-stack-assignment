// backend/src/routes/news.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const TOP_STORIES_URL =
  "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

// GET /api/news/top-tech
router.get("/top-tech", async (req, res) => {
  try {
    // 1) Get list of top story IDs
    const response = await fetch(TOP_STORIES_URL);
    const ids = await response.json(); // big array of numbers

    // 2) Take first 20 IDs to be safe
    const topIds = ids.slice(0, 20);

    // 3) Fetch item details for each ID
    const items = await Promise.all(
      topIds.map(async (id) => {
        try {
          const itemRes = await fetch(ITEM_URL(id));
          return await itemRes.json();
        } catch (err) {
          console.error("Failed to fetch item", id, err);
          return null;
        }
      })
    );

    // 4) Filter to "story" type and pick first 5
    const stories = items
      .filter((item) => item && item.type === "story")
      .slice(0, 5)
      .map((item) => ({
        id: item.id,
        title: item.title,
        url:
          item.url || `https://news.ycombinator.com/item?id=${item.id}`,
        score: item.score,
        time: item.time,
        type: item.type,
        by: item.by
      }));

    // 5) Send to frontend
    res.json({ stories });
  } catch (err) {
    console.error("Error fetching HackerNews:", err);
    res.status(500).json({ error: "Failed to fetch HackerNews stories" });
  }
});

export default router;
