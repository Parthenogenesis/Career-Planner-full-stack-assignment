// frontend/src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import CareerForm from "./components/CareerForm";
import SkillGapResults from "./components/SkillGapResults";
import Roadmap from "./components/Roadmap";
import NewsSection from "./components/NewsSection";

const API_BASE = "http://localhost:4000"; // backend URL

function App() {
  const [loading, setLoading] = useState(false);
  const [skillGapResult, setSkillGapResult] = useState(null);
  const [roadmapResult, setRoadmapResult] = useState(null);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  // Load HackerNews stories when the page first loads
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/news/top-tech`);
        const data = await res.json();
        if (data.stories) {
          setNews(data.stories);
        }
      } catch (err) {
        console.error("Failed to load news", err);
      }
    };

    fetchNews();
  }, []);

  // Called when "Analyze My Career Path" is clicked
  const handleAnalyze = async ({ targetRole, currentSkills }) => {
    setLoading(true);
    setError(null);
    setSkillGapResult(null);
    setRoadmapResult(null);

    try {
      // Run both API calls at the same time
      const [gapRes, roadmapRes] = await Promise.all([
        fetch(`${API_BASE}/api/skill-gap`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetRole, currentSkills }),
        }),
        fetch(`${API_BASE}/api/roadmap`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetRole }),
        }),
      ]);

      const gapData = await gapRes.json();
      const roadmapData = await roadmapRes.json();

      if (!gapRes.ok) {
        throw new Error(gapData.error || "Skill gap analysis failed");
      }
      if (!roadmapRes.ok) {
        throw new Error(roadmapData.error || "Roadmap generation failed");
      }

      setSkillGapResult(gapData);
      setRoadmapResult(roadmapData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Career Skill Gap & Roadmap Planner</h1>
        <p>
          Enter your target role and current skills to see gaps, recommendations,
          and a tailored career roadmap.
        </p>
      </header>

      <section className="form-section">
        <CareerForm onAnalyze={handleAnalyze} loading={loading} />
        {error && <div className="error-banner">{error}</div>}
      </section>

      <section className="dashboard">
        <div className="dashboard-top">
          <div className="panel">
            <h2>Skill Gap Analysis</h2>
            <SkillGapResults result={skillGapResult} loading={loading} />
          </div>

          <div className="panel">
            <h2>Career Roadmap</h2>
            <Roadmap result={roadmapResult} loading={loading} />
          </div>
        </div>

        <div className="dashboard-bottom">
          <div className="panel">
            <h2>Latest Tech News</h2>
            <NewsSection stories={news} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
