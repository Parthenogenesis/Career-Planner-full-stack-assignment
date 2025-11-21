# Career Skill Gap & Roadmap Planner

A small full-stack project that analyzes a user's skills against a target role,
returns missing skills with recommendations, generates a mock career roadmap,
and shows latest tech news using the public HackerNews API.

Built as part of the Full-Stack Intern assignment.

---

## 1. Tech Stack

**Frontend**
- React (Vite)
- Fetch API for calling backend

**Backend**
- Node.js
- Express
- node-fetch (for HackerNews)
- CORS enabled

**Public API**
- HackerNews (Top Stories)

---

## 2. Project Structure

```bash
career-planner/
  backend/
    src/
      index.js           # Express app entry
      data/
        roles.js         # Role → skills + roadmap definitions
      routes/
        skillGap.js      # POST /api/skill-gap
        roadmap.js       # POST /api/roadmap
        news.js          # GET  /api/news/top-tech
    package.json

  frontend/
    src/
      App.jsx            # Main layout + API calls
      App.css            # Basic responsive styling
      main.jsx           # React entry point
      components/
        CareerForm.jsx
        SkillGapResults.jsx
        Roadmap.jsx
        NewsSection.jsx
    package.json

How to run frontend
cd frontend
npm install
npm run dev

How to run backend
cd backend
npm installgit
npm run dev