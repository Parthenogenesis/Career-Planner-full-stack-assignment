// backend/src/data/roles.js

// Skills required for each role
export const ROLE_SKILLS = {
  FrontendDeveloper: ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
  "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"]
};

// Helper: normalize role names (case-insensitive, ignore spaces)
export const normalizeRoleKey = (role) =>
  role ? role.toLowerCase().replace(/\s+/g, "") : "";

// Map normalized → original key
export const ROLE_KEYS_NORMALIZED = Object.keys(ROLE_SKILLS).reduce(
  (acc, key) => {
    acc[normalizeRoleKey(key)] = key;
    return acc;
  },
  {}
);

// 3-level roadmap for each role (mock AI)
export const ROLE_ROADMAPS = {
  "Backend Developer": [
    {
      phase: "Phase 1",
      duration: "1–2 months",
      focus: ["Java basics", "OOP", "Git"],
      description:
        "Build a strong foundation in Java syntax, OOP principles, and version control using Git."
    },
    {
      phase: "Phase 2",
      duration: "2 months",
      focus: ["Spring Boot", "SQL", "REST APIs"],
      description:
        "Learn to build RESTful APIs with Spring Boot, design relational schemas, and query using SQL."
    },
    {
      phase: "Phase 3",
      duration: "1–2 months",
      focus: ["Deployment", "Projects", "System design basics"],
      description:
        "Deploy applications, build 1–2 portfolio projects, and understand basic system design."
    }
  ],
  FrontendDeveloper: [
    {
      phase: "Phase 1",
      duration: "1–2 months",
      focus: ["HTML", "CSS", "Basic JavaScript"],
      description:
        "Learn how the web works, structure pages with HTML, style them with CSS, and add basic JS interactivity."
    },
    {
      phase: "Phase 2",
      duration: "2 months",
      focus: ["React", "Components", "State"],
      description:
        "Build reusable UI components, manage state, and create a single-page app using React."
    },
    {
      phase: "Phase 3",
      duration: "1–2 months",
      focus: ["APIs", "Routing", "Deployment"],
      description:
        "Consume REST APIs, handle routing, and deploy the frontend on platforms like Vercel/Netlify."
    }
  ],
  "Data Analyst": [
    {
      phase: "Phase 1",
      duration: "1–2 months",
      focus: ["Excel", "Basic Statistics"],
      description:
        "Use spreadsheets, formulas, pivot tables, and descriptive stats for basic analysis."
    },
    {
      phase: "Phase 2",
      duration: "2 months",
      focus: ["SQL", "Python basics"],
      description:
        "Query databases using SQL and use Python for data cleaning and simple visualizations."
    },
    {
      phase: "Phase 3",
      duration: "1–2 months",
      focus: ["Dashboards", "Projects"],
      description:
        "Build dashboards (Power BI/Tableau) and complete 1–2 end-to-end analysis projects."
    }
  ]
};
