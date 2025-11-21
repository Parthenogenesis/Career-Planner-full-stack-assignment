// backend/src/routes/roadmap.js
import express from "express";
import {
  ROLE_ROADMAPS,
  ROLE_KEYS_NORMALIZED,
  normalizeRoleKey
} from "../data/roles.js";

const router = express.Router();

// POST /api/roadmap
// Body:
// {
//   "targetRole": "Backend Developer"
// }
router.post("/", (req, res) => {
  try {
    const { targetRole } = req.body || {};

    if (!targetRole) {
      return res.status(400).json({
        error: "targetRole (string) is required."
      });
    }

    const normalizedKey = normalizeRoleKey(targetRole);
    const roleKey = ROLE_KEYS_NORMALIZED[normalizedKey];

    if (!roleKey || !ROLE_ROADMAPS[roleKey]) {
      return res.status(404).json({
        error: `No roadmap defined for role: ${targetRole}`,
        supportedRoles: Object.keys(ROLE_ROADMAPS)
      });
    }

    const phases = ROLE_ROADMAPS[roleKey];

    return res.json({
      targetRole: roleKey,
      phases
    });
  } catch (err) {
    console.error("Error in /api/roadmap:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
