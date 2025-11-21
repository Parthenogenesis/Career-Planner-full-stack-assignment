// backend/src/routes/skillGap.js
import express from "express";
import {
  ROLE_SKILLS,
  ROLE_KEYS_NORMALIZED,
  normalizeRoleKey
} from "../data/roles.js";

const router = express.Router();

// Temporary test route
router.get("/ping", (req, res) => {
  res.json({ message: "skill-gap router is mounted" });
});

// POST /api/skill-gap
router.post("/", (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body || {};

    if (!targetRole || !Array.isArray(currentSkills)) {
      return res.status(400).json({
        error: "targetRole (string) and currentSkills (array of strings) are required."
      });
    }

    const normalizedKey = normalizeRoleKey(targetRole);
    const roleKey = ROLE_KEYS_NORMALIZED[normalizedKey];

    if (!roleKey) {
      return res.status(404).json({
        error: `No skill template found for role: ${targetRole}`,
        supportedRoles: Object.keys(ROLE_SKILLS)
      });
    }

    const requiredSkills = ROLE_SKILLS[roleKey];

    const currentSet = new Set(
      currentSkills.map((s) => s.trim().toLowerCase()).filter(Boolean)
    );

    const matchedSkills = requiredSkills.filter((skill) =>
      currentSet.has(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(
      (skill) => !currentSet.has(skill.toLowerCase())
    );

    const recommendations = [];
    if (missingSkills.length === 0) {
      recommendations.push(
        "You already match the core skills for this role. Focus on projects and interview prep."
      );
    } else {
      recommendations.push(
        `Start with foundational skills first: ${missingSkills
          .slice(0, 2)
          .join(", ")}.`
      );
      if (missingSkills.includes("Git")) {
        recommendations.push(
          "Learn Git early so you can track progress and collaborate using version control."
        );
      }
      if (missingSkills.includes("SQL")) {
        recommendations.push(
          "SQL is core for backend and data roles; prioritize it in the first month."
        );
      }
    }

    const suggestedLearningOrder = [...missingSkills];

    return res.json({
      targetRole: roleKey,
      requiredSkills,
      matchedSkills,
      missingSkills,
      recommendations,
      suggestedLearningOrder
    });
  } catch (err) {
    console.error("Error in /api/skill-gap:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
